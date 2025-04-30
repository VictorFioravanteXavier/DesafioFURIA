require('dotenv').config();
const axios = require('axios');

const convertMarkdownToHtml = require('./markdoowToHTML');

exports.gemini = async function (text) {
    const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
            {
                contents: [
                    {
                        role: 'user',
                        parts: [{ text }]
                    }
                ]
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (!response.data?.candidates || response.data.candidates.length === 0) {
            throw new Error('Nenhuma resposta válida do Gemini.');
        }

        const botResponse = response.data.candidates[0].content.parts[0].text;

        // ✅ Apenas retorna o texto convertido
        return convertMarkdownToHtml(botResponse);
    } catch (error) {
        console.error(error.response?.data || error);
        throw new Error('Erro ao se comunicar com o Gemini.');
    }
}
