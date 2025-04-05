const express = require('express');
const router = express.Router();
const FinancialAdvisorChatbot = require('../chatbot/aichatwrapper');

const chatbot = new FinancialAdvisorChatbot();

// Chatbot interaction endpoint 200 ok tested
router.post('/chat', async (req, res) => {
  const { message, userId } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ error: 'Message and userId are required' });
  }

  try {
    const response = await chatbot.chat(message, userId);
    res.json({ response });
  } catch (error) {
    console.error('Error in chatbot route:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// status endpoint for chatbot 200 ok tested
router.get('/status', async (req, res) => {
  try {
    if (!chatbot) {
      throw new Error('Chatbot service not initialized');
    }
    res.json({ status: 'Chatbot service is running' });
  } catch (error) {
    console.error('Error checking chatbot status:', error.message);
    res.status(500).json({ error: 'Chatbot service unavailable' });
  }
});

module.exports = router;
