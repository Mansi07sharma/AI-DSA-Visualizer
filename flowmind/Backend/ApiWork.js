import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const getAiApi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

//remove markdown formatting from the response
function cleanResponse(text) {
    text = text.replace(/```json\n?/g, '')
    text = text.replace(/```\n?/g, '')
    text = text.trim()
    return text;
}

export async function generateResponse(problem) {
    const model = getAiApi.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are an expert DSA mentor. For the given DSA problem, provide all possible solution approaches.

Return ONLY a JSON array of objects, with NO markdown formatting, NO explanations, and NO extra text. Each object must have these exact fields:
{
  "title": string,
  "timeComplexity": string,
  "spaceComplexity": string,
  "description": string,
  "code": {
  "javaCode": string (Java code),
  "pythonCode": string (Python code),
  "cppCode": string (C++ code),
  "jsCode": string (JavaScript code),
  }
  
  "pros": string[],
  "cons": string[],
  "concepts": string[]
}

Problem:
${problem};
`

    try {
        const textByAi = await model.generateContent(prompt);
        const response = await textByAi.response;
        const fineResponse = await cleanResponse(response.text());
        const jsonResponse = JSON.parse(fineResponse);
        return jsonResponse;
    } catch (e) {
        console.log("Error generating response:", e);
        throw e;
    }

}

export async function generateFlowchartFromCode(code) {
  const model = getAiApi.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const prompt = `You are an expert software engineer, data structures and algorithms instructor, and flowchart visualization designer.

Your task is to:
- Carefully analyze the full logic of the given code, including:
  • Variable initializations
  • Loop structures (for, while)
  • Conditional checks (if, else, ternary)
  • Recursive calls
  • Function calls and return points

🎯 Your output must be a **clean, syntax-safe Mermaid.js flowchart** that visualizes the complete control flow of the code.

📌 OUTPUT FORMAT — STRICTLY FOLLOW THIS:
Return only a valid JSON object:
{
  "flowchart": "flowchart TD\\nA[\\"Start\\"] --> B[\\"Initialize x\\"]\\nB --> C{\\"Is x greater than 0?\\"}\\nC -- Yes --> D[\\"Do something\\"]\\nC -- No --> E[\\"Return result\\"]"
}

📌 STRICT RULES:
- Use unique **uppercase letters** (A, B, C, ...) for every new node
- Use **[ ... ]** for actions and **{ ... }** for condition checks
- Escape all double quotes and newline characters as shown (\\n, \\")
- Node labels must be in **simple, readable English**
- Avoid using exact code like i < n — say “Is i less than n”
- Do NOT include semicolons, comments, markdown, or code snippets in the labels
- Do NOT return multiple flowcharts or explanations — only the JSON object

💡 PRO TIPS:
- You may group sequential steps into a single node (e.g., "Initialize i, j, k")
- Always label conditional branches with -- Yes --> and -- No -->
- Use “Return result” or “End” for termination nodes

Now analyze the following code and generate a proper flowchart:

\`\`\`java
${code}
\`\`\`
`;




  try {
    const textByAi = await model.generateContent(prompt);
    const response = await textByAi.response;
    const fineResponse = await cleanResponse(response.text());
    const jsonResponse = JSON.parse(fineResponse);
    return jsonResponse.flowchart;
  } catch (e) {
    console.log("Error generating flowchart:", e);
    throw e;
  }
}



