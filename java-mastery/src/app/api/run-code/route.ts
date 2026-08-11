import { NextRequest, NextResponse } from 'next/server';
import type { CodeLanguage } from '@/lib/codeRunner';

export const runtime = 'nodejs';

const JUDGE0_URL = process.env.JUDGE0_URL || 'https://judge0-ce.p.rapidapi.com';
const RAPIDAPI_HOST = new URL(JUDGE0_URL).host;
const MAX_CODE_LENGTH = 64_000;
const MAX_STDIN_LENGTH = 16_000;

// Judge0 CE language IDs exposed by the official RapidAPI instance.
const LANGUAGE_IDS: Record<CodeLanguage, number> = {
  cpp: 54,
  java: 62,
  javascript: 63,
  typescript: 74,
  python: 71,
};

interface JudgeResult {
  status?: { id: number; description: string };
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  message?: string | null;
  time?: string | null;
  memory?: number | null;
}

function decode(value?: string | null) {
  if (!value) return '';
  try {
    return Buffer.from(value, 'base64').toString('utf8');
  } catch {
    return value;
  }
}

function headers(apiKey: string) {
  return {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': RAPIDAPI_HOST,
  };
}

export async function GET() {
  return NextResponse.json({
    configured: Boolean(process.env.RAPIDAPI_KEY),
    provider: 'Judge0 CE via RapidAPI',
    languages: Object.keys(LANGUAGE_IDS),
  });
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Code execution is not configured. Add RAPIDAPI_KEY to the server environment.' },
      { status: 503 },
    );
  }

  let body: { code?: unknown; language?: unknown; stdin?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const code = typeof body.code === 'string' ? body.code : '';
  const stdin = typeof body.stdin === 'string' ? body.stdin : '';
  const language = body.language as CodeLanguage;

  if (!code.trim()) return NextResponse.json({ error: 'Enter some code before running it.' }, { status: 400 });
  if (!(language in LANGUAGE_IDS)) return NextResponse.json({ error: 'Unsupported programming language.' }, { status: 400 });
  if (code.length > MAX_CODE_LENGTH) return NextResponse.json({ error: 'Code is too large (64 KB maximum).' }, { status: 413 });
  if (stdin.length > MAX_STDIN_LENGTH) return NextResponse.json({ error: 'Standard input is too large (16 KB maximum).' }, { status: 413 });

  try {
    const submitResponse = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=true&wait=false`, {
      method: 'POST',
      headers: headers(apiKey),
      body: JSON.stringify({
        source_code: Buffer.from(code).toString('base64'),
        stdin: Buffer.from(stdin).toString('base64'),
        language_id: LANGUAGE_IDS[language],
        cpu_time_limit: 5,
        memory_limit: 128000,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: 'no-store',
    });

    if (!submitResponse.ok) {
      console.error('Judge0 submission failed', submitResponse.status);
      const status = submitResponse.status === 401 || submitResponse.status === 403 ? 503 : 502;
      return NextResponse.json(
        { error: status === 503 ? 'The RapidAPI key is invalid or is not subscribed to Judge0 CE.' : 'The code execution provider rejected the submission.' },
        { status },
      );
    }

    const submission = (await submitResponse.json()) as { token?: string };
    if (!submission.token) throw new Error('Judge0 did not return a submission token');

    for (let attempt = 0; attempt < 20; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const resultResponse = await fetch(
        `${JUDGE0_URL}/submissions/${submission.token}?base64_encoded=true&fields=status,stdout,stderr,compile_output,message,time,memory`,
        { headers: headers(apiKey), signal: AbortSignal.timeout(10_000), cache: 'no-store' },
      );

      if (!resultResponse.ok) {
        console.error('Judge0 result lookup failed', resultResponse.status);
        return NextResponse.json({ error: 'Could not retrieve the execution result.' }, { status: 502 });
      }

      const result = (await resultResponse.json()) as JudgeResult;
      if ((result.status?.id ?? 0) > 2) {
        return NextResponse.json({
          status: result.status,
          stdout: decode(result.stdout),
          stderr: decode(result.stderr),
          compileOutput: decode(result.compile_output),
          message: decode(result.message),
          time: result.time ?? null,
          memory: result.memory ?? null,
        });
      }
    }

    return NextResponse.json({ error: 'Execution did not finish within 10 seconds.' }, { status: 504 });
  } catch (error) {
    console.error('Code execution failed', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'The code runner could not be reached.' }, { status: 502 });
  }
}
