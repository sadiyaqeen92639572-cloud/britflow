import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini, SYSTEM_PROMPT } from "../../../lib/gemini";
import { generateBankingAudit } from "../../../data/staticDatabase";


export async function POST(req: NextRequest) {
  const { cashAmount, bankType, hasAtd } = await req.json();

  const result = await generateWithGemini(
    SYSTEM_PROMPT,
    `Analyse de résilience bancaire pour ${cashAmount}€.`
  );

  return NextResponse.json({ result: result ?? generateBankingAudit(cashAmount, bankType, hasAtd) });
}
