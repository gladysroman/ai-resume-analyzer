require("dotenv").config();

const OpenAI = require("openai");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const upload = multer();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
const express = require('express'); //importing express module; framework for building web applications in Node.js
const app = express(); // server instance; backend controller
app.use(express.static(__dirname));
app.use(express.json()); //middleware to parse incoming JSON request bodies; allows the server to access data sent by the client in JSON format
//full request-response cycle; handles incoming requests, processes them, and sends back responses
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  console.log("Message received:", userMessage);

  try {

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI resume reviewer. Score resumes from 1-100 and give clear suggestions to improve them for tech roles." },
        { role: "user", content: userMessage }
      ]
    });

    const aiReply = completion.choices[0].message.content;

    res.json({
      reply: aiReply
    });

  } catch (error) {
    console.error(error);

    res.json({
      reply: "Error contacting AI"
    });
  }
});

app.post("/api/upload", upload.single("resume"), async (req, res) => {

  try {

    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert technical recruiter.

          Analyze the resume and respond in this format:

          Score: (1-100)

          Strengths:
          - bullet points

          Weaknesses:
          - bullet points

          How to improve for tech roles:
          - bullet points`
        },
        {
          role: "user",
          content: resumeText
        }
      ]
    });

    const analysis = completion.choices[0].message.content;

    res.json({
      analysis: analysis
    });

  } catch (error) {

    console.error(error);

    res.json({
      analysis: "Error analyzing resume"
    });

  }

});

//tells server to listen on a specific port (3000 in this case) for incoming requests
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

