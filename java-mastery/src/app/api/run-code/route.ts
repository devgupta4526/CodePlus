import { NextRequest, NextResponse } from 'next/server';

// Judge0 CE language IDs
// 62 = Java (OpenJDK 13.0.1)
const JAVA_LANGUAGE_ID = 62;
const JUDGE0_URL = process.env.JUDGE0_URL || 'https://judge0-ce.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

export async function POST(request: NextRequest) {
  const { code, stdin = '' } = await request.json();

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  // If no Judge0 key configured, return a helpful mock response
  if (!RAPIDAPI_KEY) {
    return NextResponse.json({
      status: { id: 0, description: 'Not Configured' },
      stdout: null,
      stderr: null,
      compile_output: null,
      message: 'RAPIDAPI_KEY is not set in .env.local — code execution is disabled. See SETUP.md for instructions.',
      mockMode: true,
    });
  }

  try {
    // Submit to Judge0
    const submitRes = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
      body: JSON.stringify({
        source_code: code,
        language_id: JAVA_LANGUAGE_ID,
        stdin,
        cpu_time_limit: 5,
        memory_limit: 128000,
      }),
    });

    if (!submitRes.ok) {
      const body = await submitRes.text();
      return NextResponse.json({ error: `Judge0 submission failed: ${body}` }, { status: 502 });
    }

    const { token } = await submitRes.json();

    // Poll for result (max 10 attempts, 1s apart)
    for (let i = 0; i < 10; i++) {
      await new Promise((r) => setTimeout(r, 1000));
      const resultRes = await fetch(
        `${JUDGE0_URL}/submissions/${token}?base64_encoded=false&fields=status,stdout,stderr,compile_output,time,memory`,
        {
          headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          },
        }
      );
      const result = await resultRes.json();
      // Status 1 = In Queue, 2 = Processing
      if (result.status?.id > 2) {
        return NextResponse.json(result);
      }
    }

    return NextResponse.json({ error: 'Execution timed out' }, { status: 504 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
