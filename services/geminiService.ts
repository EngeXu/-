import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CaseData, Verdict } from "../types";

const verdictSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    winner: {
      type: Type.STRING,
      enum: ["Party A", "Party B", "Tie"],
      description: "Who won the argument based on logic and empathy. Must be one of the enums.",
    },
    winnerName: {
      type: Type.STRING,
      description: "The name of the winning party (or '所有人' if it's a tie). In Chinese.",
    },
    scoreA: {
      type: Type.INTEGER,
      description: "Score for Party A out of 100.",
    },
    scoreB: {
      type: Type.INTEGER,
      description: "Score for Party B out of 100.",
    },
    summary: {
      type: Type.STRING,
      description: "A quick summary of the conflict in 1-2 sentences. In Chinese.",
    },
    analysis: {
      type: Type.STRING,
      description: "Detailed analysis of why the judge decided the verdict. In Chinese.",
    },
    advice: {
      type: Type.STRING,
      description: "Constructive, relationship-building advice for the couple. In Chinese.",
    },
    humorousComment: {
      type: Type.STRING,
      description: "A funny, dog-themed comment or pun from the judge. In Chinese.",
    },
  },
  required: ["winner", "winnerName", "scoreA", "scoreB", "summary", "analysis", "advice", "humorousComment"],
};

export const judgeCase = async (caseData: CaseData): Promise<Verdict> => {
  // In Vite via define in config, process.env.API_KEY is replaced by the actual VITE_API_KEY string
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is missing. Please ensure VITE_API_KEY is set in your .env file.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    你现在是尊贵的巴卡比法官（Judge Barkaby），一只充满智慧、公正且超级可爱的金毛寻回犬，你负责主持“萌宠断案庭”。
    有两位人类（通常是情侣）发生了争执，需要你来判定谁是对的。

    甲方姓名: ${caseData.partyA.name}
    甲方陈述: ${caseData.partyA.statement}
    甲方立场: ${caseData.partyA.stance}

    乙方姓名: ${caseData.partyB.name}
    乙方陈述: ${caseData.partyB.statement}
    乙方立场: ${caseData.partyB.stance}

    你的任务:
    1. 仔细阅读双方的陈述。
    2. 判断谁更讲道理，或者这是否只是一个误会（平局/Tie）。
    3. 根据“人类行为准则”为每一方打分（0-100分）。
    4. 给出判决结果、案情分析和建设性的建议。
    5. 要有同理心，但也要坚定。
    6. 关键：必须使用“狗狗”的人设。使用与狗相关的幽默、双关语（例如：为了“骨气”、“汪”费心机、单身“狗”粮、咬文嚼字等，或者模仿狗狗的语气词）。
    7. 所有输出内容（summary, analysis, advice, humorousComment）必须是中文。

    请注意：
    - winner 字段必须严格返回 "Party A", "Party B", 或 "Tie"。
    - scoreA 和 scoreB 为 0 到 100 的整数。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: verdictSchema,
        systemInstruction: "你是一只可