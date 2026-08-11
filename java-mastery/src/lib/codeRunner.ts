export type CodeLanguage = 'java' | 'python' | 'javascript' | 'typescript' | 'cpp';

export interface CodeExecutionResult {
  status: { id: number; description: string };
  stdout: string;
  stderr: string;
  compileOutput: string;
  message: string;
  time: string | null;
  memory: number | null;
}

export async function executeCode(
  code: string,
  language: CodeLanguage,
  stdin = '',
): Promise<CodeExecutionResult> {
  const response = await fetch('/api/run-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, language, stdin }),
  });

  const payload = (await response.json().catch(() => null)) as
    | (Partial<CodeExecutionResult> & { error?: string })
    | null;

  if (!response.ok) {
    throw new Error(payload?.error || 'The code runner is temporarily unavailable.');
  }

  return {
    status: payload?.status ?? { id: 0, description: 'Unknown' },
    stdout: payload?.stdout ?? '',
    stderr: payload?.stderr ?? '',
    compileOutput: payload?.compileOutput ?? '',
    message: payload?.message ?? '',
    time: payload?.time ?? null,
    memory: payload?.memory ?? null,
  };
}

export function executionText(result: CodeExecutionResult) {
  return result.stdout || result.compileOutput || result.stderr || result.message || 'Program finished with no output.';
}
