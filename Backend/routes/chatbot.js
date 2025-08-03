const express = require('express');
const router = express.Router();
const axios = require('axios');

const LANGFLOW_API_KEY = process.env.LANGFLOW_API_KEY; // ⚠️ Store securely in .env
const FLOW_ID = 'f958adf0-7a06-4a89-843a-18e3f876110e';
const LANGFLOW_API_URL = `http://localhost:7860/api/v1/run/${FLOW_ID}?stream=false`;

// POST /api/chat
router.post('/', async (req, res) => {
  const userMessage = req.body.message;

  const payload = {
    input_type: "chat",
    output_type: "chat",
    input_value: userMessage,
    tweaks: {
      "GroqModel-R0HwU": {
        stream: false
      }
    }
  };

  try {
    const response = await axios.post(LANGFLOW_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': LANGFLOW_API_KEY
      }
    });

    const reply =
      response?.data?.result?.output ||
      response?.data?.outputs?.[0]?.outputs?.[0]?.results?.message?.text ||
      '⚠️ No valid response from Langflow';

    res.json({ reply: reply.trim() });

  } catch (error) {
    console.error('❌ Langflow API Error:', error.message);
    res.status(500).json({ error: '⚠️ Failed to contact Langflow API' });
  }
});

module.exports = router;
