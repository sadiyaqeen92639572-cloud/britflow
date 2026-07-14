// Client-side wrappers with the same signatures as the old services/geminiService.ts,
// now calling the server-side API routes (app/api/*) instead of the @google/genai SDK
// directly — keeps the Gemini API key server-only.

async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data.result as T;
}

export const getTaxInsight = (revenue: number, industry: string) =>
  postJSON<string>('/api/tax-insight', { revenue, industry });

export const getEmergencySolution = (query: string) =>
  postJSON<string>('/api/emergency-solution', { query });

export const getSubstanceAudit = (answers: string[]) =>
  postJSON<string>('/api/substance-audit', { answers });

export const getBankingSecurityAudit = (data: { cashAmount: number; bankType: string; hasAtd: string }) =>
  postJSON<string>('/api/banking-audit', data);

export const getExpansionInsight = (currentRevenue: number, targetRevenue: number, strategy: string) =>
  postJSON<string>('/api/expansion-insight', { currentRevenue, targetRevenue, strategy });
