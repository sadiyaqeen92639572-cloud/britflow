import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini, SYSTEM_PROMPT } from "../../../lib/gemini";
import { generateSubstanceAudit } from "../../../data/staticDatabase";


export async function POST(req: NextRequest) {
  const { answers } = await req.json();

  const result = await generateWithGemini(
    SYSTEM_PROMPT,
    `Audit de substance basé sur ces réponses : ${answers.join(", ")}.`
  );

  return NextResponse.json({ result: result ?? generateSubstanceAudit(answers) });
}
