# FlowMind – Problem to Flowchart (AI-DSA-Visualizer).

FlowMind is an AI-powered platform that transforms data structure and algorithm (DSA) problems into **multi-language code solutions**, **step-by-step AI explanations**, and **interactive flowchart visualizations**.  
Built with **React**, **Express.js**, and powered by **Google Gemini**, FlowMind is designed to make DSA learning **intuitive**, **visual**, and **interactive**.

---

##  Features

### 🤖 Gemini-Powered Intelligence
- Accepts plain-text DSA problem statements.
- Uses Gemini to generate:
  - Multiple solutions in **C++, Python, Java, JavaScript**.
  - Time & space complexity analysis.
  - Pros and cons of each approach.
  - Step-by-step logic breakdown.
  
### 🧠 Visual Algorithm Flow
- Dynamically generated **interactive flowcharts** for each solution.
- Visual representation of control flow using React-based rendering and Mermaid.js-style parsing.
- Clear logical paths and decisions are mapped directly from Gemini's response.

### 👑 N-Queen Problem Visualizer
- Specialized visualization for the **N-Queen problem**.
- See each queen's placement step-by-step.
- Real-time updates as the algorithm backtracks and explores new configurations.

### 🌐 API-Driven Architecture
- Backend built with **Express.js**.
- Gemini API used to handle prompt crafting and AI response parsing.
- **Postman** used extensively for testing and documenting all API endpoints.

### 🧪 Technologies Used
| Layer           | Tech Stack                             |
|----------------|-----------------------------------------|
| Frontend       | React.js, Tailwind CSS, Mermaid         |
| Backend        | Node.js, Express.js                     |
| AI Integration | Google Gemini API                       |
| Testing        | Postman                                 |



## How It Works...

1. **User Input:**
   - Enter your DSA problem and choose a programming language.

2. **Gemini Processing:**
   - The backend sends structured prompts to Gemini API.
   - Gemini returns multiple code solutions, complexity analysis, pros/cons, and a detailed explanation.

3. **Flowchart Generation:**
   - The response is parsed and translated into **Mermaid-compatible syntax**.
   - React renders the flowchart using a custom visualization engine.

4. **Visualization (N-Queen Example):**
   - If finds the problem is n queen then, it enables.
   - A custom recursive visualizer built in React shows how the N-Queen problem is solved step-by-step.
   - Great for understanding backtracking algorithms visually.

---


##  Installation

###  Prerequisites
- Node.js & npm
- Google Gemini API Key
- Postman (for API testing)

### 🔄 Clone the Repository

```bash
git clone https://github.com/Mansi07sharma/ai-dsa-visualizer.git
cd ai-dsa-visualizer/flowmind
npm install
npm run dev
```

<i>On going learning and projects...<br>Thanks for reaching out.</i>
