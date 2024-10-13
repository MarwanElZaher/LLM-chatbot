import { GoogleGenerativeAI } from "@google/generative-ai";
import { HumanMessage } from "@langchain/core/messages";
import { prompts } from "../constants.js";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// export const getChatResponse = async (message) => {
//   const humanMessage = new HumanMessage(message);
//   const result = await model.generateContent(humanMessage.content);
//   console.log(humanMessage)
//   console.log(result, "result")
//   return humanMessage
// }


export const getChatResponse = async (message) => {
  const result = await model.generateContent(
    `${prompts}\n\nUser query:${message}`
  );
  const response = await result.response;
  const text = response.text();

  return text;
};
