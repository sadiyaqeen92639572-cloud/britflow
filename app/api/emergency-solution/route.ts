import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini, PANIC_PROMPT } from "../../../lib/gemini";
import { generateEmergencySolution } from "../../../data/staticDatabase";


export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const result = await generateWithGemini(
    PANIC_PROMPT,
    `QUESTION DE CRISE : "${query}".
    Fournis une solution d'ingénierie légale via le Royaume-Uni pour protéger l'entrepreneur.`,
    1
  );

  return NextResponse.json({ result: result ?? generateEmergencySolution(query) });
}
