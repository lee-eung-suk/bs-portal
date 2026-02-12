import { GoogleGenAI } from "@google/genai";

// Initialize the API client
// Note: The API Key must be provided in the environment variable VITE_GEMINI_API_KEY or REACT_APP_GEMINI_API_KEY depending on build tool
// For this environment, we use process.env.API_KEY as per instructions.
const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateAssistantResponse = async (prompt: string): Promise<string> => {
  if (!ai) {
    return "API 키가 설정되지 않아 AI를 사용할 수 없습니다.";
  }

  try {
    const model = 'gemini-3-flash-preview'; // Using the recommended flash model for speed
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "당신은 봉성초등학교의 친절하고 유능한 AI 교무 보조입니다. 선생님들의 업무(가정통신문 작성, 인사말, 문자 메시지 초안 작성, 간단한 행정 질의 등)를 도와주세요. 말투는 정중하고 간결하며, 초등학교 교육 현장에 맞는 따뜻한 어조를 사용하세요. 200자 이내로 요약해서 답변해주는 것을 선호합니다.",
      },
    });

    return response.text || "죄송합니다. 답변을 생성할 수 없습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};