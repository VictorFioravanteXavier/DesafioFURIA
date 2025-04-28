require('dotenv').config();
const axios = require('axios');
const getDataFuria = require('../services/dataFuria'); // ajuste o path se necessário

// Histórico global de mensagens (resetado se o servidor reiniciar)
const contextoGlobal = [];
furiaResumo = ''

exports.sendMessage = async (req, res) => {

    if (furiaResumo === '') {
        let furiaData;
        try {
            furiaData = await getDataFuria();
        } catch (error) {
            console.error('Erro ao carregar dados da FURIA:', error.message);
            return res.status(500).json({ message: 'Erro ao buscar dados da FURIA.' });
        }
    
        if (!furiaData) {
            return res.status(500).json({ message: 'Dados da FURIA não disponíveis.' });
        }
    
        furiaResumo = `
            Time: ${furiaData.team}
            Jogo: ${furiaData.game}
            
            Histórico Completo:
            
            ${Object.entries(furiaData.years).map(([year, data]) => `
            Ano ${year}:
            
            Lineup:
            ${data.lineup.map(player => `- ${player}`).join('\n')}
            
            Conquistas:
            ${data.achievements.length > 0 ? data.achievements.map(a => `- ${a}`).join('\n') : '- Nenhuma conquista registrada'}
            
            Torneios Disputados:
            ${data.tournamentHistory.length > 0 ? data.tournamentHistory.map(t => `- ${t}`).join('\n') : '- Nenhum torneio registrado'}
            
            Resultados em Majors:
            ${data.majorResults.length > 0 ? data.majorResults.map(m => `- ${m}`).join('\n') : '- Sem participação em Majors'}
            `).join('\n')}
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
                                    Quero que você me entregue a resposta ESTRITAMENTE usando TAGS HTML completas.
                                    IMPORTANTE: a resposta deve usar <h1>, <h2>, <ul>, <li>, <p> e demais tags HTML tradicionais.
                                    NÃO use Markdown, NÃO use formatações como "h1", "p" na frente das linhas.
                                    NÃO utilize bloco de código, apenas texto com tags reais de HTML.

                                    Exemplo correto:
                                    <h1>Título</h1>
                                    <p>Texto explicativo.</p>

                                    Exemplo incorreto:
                                    h1 Título
                                    p Texto explicativo

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

        if (!response.data?.candidates || response.data.candidates.length === 0) {
            throw new Error('Nenhuma resposta válida do Gemini.');
        }
        
        const botResponse = response.data.candidates[0].content.parts[0].text;
        

        // Salva a resposta no histórico
        contextoGlobal.push({ role: "user", text: userInput });
        contextoGlobal.push({ role: "bot", text: botResponse });
        
        res.json({ response: botResponse });
    } catch (error) {
        console.error(error.response?.data || error);
        res.status(500).json({ message: 'Erro ao se comunicar com o Gemini.' });
    }
};
