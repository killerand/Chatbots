import { config } from "dotenv";
config();

import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

// Set up OpenAI configuration
const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
);

// Set up command-line input/output
const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "You: "
});

userInterface.prompt();

userInterface.on("line", async (input) => {
  try {
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });

    console.log("AI:", response.data.choices[0].message.content.trim());
  } catch (err) {
    console.error("Error:", err.message);
  }

  userInterface.prompt();
});
async function sendMessage() {
    const input = document.getElementById("input").value;
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });
  
    const data = await res.json();
    document.getElementById("response").textContent = "AI: " + data.reply;
  }