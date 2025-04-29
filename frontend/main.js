import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { enviarMensagem } from './modules/chat';
import { addMenssage } from './assets/js/addMenssageFront';

document.getElementById("enviarBtn").addEventListener('click', enviarMensagem);

document.getElementById('userInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        enviarMensagem();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const mensagemBoasVindas = `
    <p>Olá! 👋 Eu sou o assistente da <strong>FURIA Esports</strong> no <strong>Counter-Strike 2</strong>!</p>
    <p>Estou aqui para te ajudar com informações sobre a história, jogadores, partidas e conquistas da FURIA no CS.</p>
    <p>Você pode me perguntar, por exemplo:</p>
    <ul>
      <li>🧠 Quem são os jogadores atuais da FURIA?</li>
      <li>🏆 Quais foram os títulos mais importantes que a FURIA venceu?</li>
      <li>📊 Como foi o desempenho da FURIA no último campeonato?</li>
      <li>🔄 Quando houve mudanças na line-up da equipe?</li>
      <li>🗓️ Qual foi o melhor ano da FURIA no CS até agora?</li>
    </ul>
    <p>É só mandar sua pergunta que eu respondo rapidinho! 🚀</p>
    `;

    addMenssage(mensagemBoasVindas, 'bot');
})