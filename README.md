# Refactor X

Refactor X is an online AI-powered code editor and assistant. It allows users to write, run, generate, modify, review, and explain code in multiple languages (Python, Java, C++, C) directly in the browser. The app features Monaco Editor, live code execution, and AI modules for code generation, refactoring, review, and explanation.

## Features

- **Multi-language support:** Python, Java, C++, C
- **AI Code Generation:** Describe your requirements and let AI generate code for you
- **Code Modification:** Refactor, optimize, and enhance your code with AI
- **Code Review:** Get automated analysis and suggestions for your code
- **Code Explanation:** Understand your code with detailed explanations
- **Live Code Execution:** Run code and view output instantly
- **Modern UI:** Built with React, Tailwind CSS, and Monaco Editor
- **Dark/Light Theme:** Switch between themes for comfortable coding

## Online Demo

[View Refactor X Online](https://refactor-x-code.vercel.app/)

## How to Use

1. **Select Language:** Choose your preferred programming language from the dropdown menu.
2. **Write or Paste Code:** Use the Monaco Editor to write or paste your code.
3. **AI Actions:**  
   - Click **Generate Code** to let AI create code from your description.
   - Click **Refactor/Modify** to optimize or change your code.
   - Click **Review** for automated code analysis and suggestions.
   - Click **Explain** to get a detailed explanation of your code.
4. **Run Code:** Click the **Run** button to execute your code and view the output instantly.
5. **Switch Theme:** Toggle between dark and light themes for a comfortable coding experience.

## Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/rahul24salunke/Refactor-x.git
   cd refactorx-frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/components/editor/CodeRunner.jsx`: Main code editor and AI assistant UI
- `src/components/ui/`: Reusable UI components (button, card, input, etc.)
- `src/utils/OutputDiaplay.jsx`: Markdown output display
- `src/lib/utils.js`: Utility functions

## Technologies Used

- React
- Vite
- Monaco Editor
- Tailwind CSS
- Radix UI
- Sonner (notifications)
- Axios
- AI backend (API required)

## License

MIT

---

> **Demo:** [View Refactor X Online](https://refactor-x-code.vercel.app/)