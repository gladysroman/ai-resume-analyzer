# AI Resume Analyzer 📄🤖
A full-stack web application designed to help software engineers optimize their resumes. It uses Node.js, Express, and OpenAI's GPT-4o-mini to provide real-time chat feedback and detailed PDF analysis.

## Features
- PDF Parsing: Extracts text from uploaded resumes using pdf-parse.
- Detailed Analysis: Provides a score (1-100), lists strengths/weaknesses, and gives actionable improvement tips.
- AI Chat Interface: A real-time chat window to ask follow-up questions about your career or resume.
- Analysis Cards: Clean UI cards for results with a built-in Copy to Clipboard feature.
- Responsive Design: A sleek, blue-themed interface that works on all screen sizes.

## Live Demo
https://github.com/user-attachments/assets/33a2db55-09f8-42bb-b803-88ecb669a043



## Tech Stack
- Frontend: HTML5, CSS3, JavaScript (Vanilla)
- Backend: Node.js, Express.js
- AI: OpenAI API (GPT-4o-mini)
- Middleware: Multer (File Uploads), Dotenv (Environment Variables)

## Installation
1. Clone the repository:  
bash  
git clone https://github.com  
cd ai-resume-analyzer  

2. Install dependencies:  
bash  
npm install express openai multer pdf-parse dotenv

3. Set up your environment variables:  
Create a .env file in the root directory:  
env  
OPENAI_API_KEY=your_api_key_here

4. Run the server:  
bash  
node server.js

5. Access the app:  
Open http://localhost:3000 in your browser.

*Use code with caution.*

## Project Structure
- index.html - The UI structure.
- server.js - Node.js server handling PDF processing and OpenAI API calls.
- script.js - Frontend logic for chat interactions and file uploads.
- style.css - Custom styling and layout definitions.
