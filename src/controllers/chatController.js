require('dotenv').config();
const axios = require('axios');

exports.sendMessage = async (req, res) => {
  const userInput = req.body.message;
  const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Responda apenas perguntas sobre a equipe de e-sports FURIA.\n\n${userInput}`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const botText = response.data.candidates[0].content.parts[0].text;
    res.json({ response: botText });

  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({ message: 'Erro ao se comunicar com o Gemini.' });
  }
};
