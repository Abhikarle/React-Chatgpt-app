const PORT = 8000;
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post("/completions", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).send("Message required");
    }

    // Convert history → OpenAI format
    const messages = [
      ...(history || []).map(msg => ({
        role: msg.role === "model" ? "assistant" : "user",
        content: msg.parts[0].text
      })),
      {
        role: "user",
        content: message
      }
    ];

    const response = await fetch("http://localhost:1234/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gemma-2b-it", //
        messages: messages
      })
    });

    const data = await response.json();

    const text = data.choices?.[0]?.message?.content || "No response";

    res.send(text);

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});