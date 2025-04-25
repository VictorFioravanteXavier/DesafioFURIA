require('dotenv').config();
const axios = require('axios');
const getFullFuriaData = require('../services/dataFuria'); // ajuste o path se necessário

// Histórico global de mensagens (resetado se o servidor reiniciar)
const contextoGlobal = [];
furiaResumo = ''

exports.sendMessage = async (req, res) => {

    if (furiaResumo === '') {
        const furiaData = await getFullFuriaData();

        const furiaResumo = `
            Time: ${furiaData.team}
            Jogo: ${furiaData.game}
            Escalação atual:
            ${furiaData.currentLineup.map(p => `- ${p.player} (${p.role})`).join('\n')}
            
            Ex-jogadores:
            ${furiaData.formerPlayers.slice(0, 5).map(p => `- ${p}`).join('\n')}
            
            Principais conquistas:
            ${furiaData.achievements.slice(0, 5).join('\n')}
            
            Histórico de torneios:
            ${furiaData.tournamentHistory.slice(0, 5).join('\n')}
            `;
    } 

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
                                text: `Você é um assistente especializado na equipe de e-sports FURIA no CS.

                                        Dados factuais sobre a FURIA (extraídos de Liquipedia):
                                        ${furiaResumo}

                                        Use essas informações e o histórico da conversa abaixo para manter o contexto:

                                        ${contextoGlobal.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n')}

                                        USER: ${userInput}`

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

        const botResponse = response.data.candidates[0].content.parts[0].text;

        // Salva a resposta no histórico
        contextoGlobal.push({ role: "user", text: userInput });
        contextoGlobal.push({ role: "bot", text: botResponse });

        console.log(`Você é um assistente especializado na equipe de e-sports FURIA no CS.

                                        Dados factuais sobre a FURIA (extraídos de Liquipedia):
                                        ${furiaResumo}

                                        Use essas informações e o histórico da conversa abaixo para manter o contexto:

                                        ${contextoGlobal.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n')}

                                        USER: ${userInput}`);


        res.json({ response: botResponse });

    } catch (error) {
        console.error(error.response?.data || error);
        res.status(500).json({ message: 'Erro ao se comunicar com o Gemini.' });
    }
};
