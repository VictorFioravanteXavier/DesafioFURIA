import { ChatPost } from "../assets/api/chatAPI";
import { addMenssage } from "../assets/js/addMenssageFront";
import { formatText } from "../assets/js/formatText";

export async function enviarMensagem() {
  const input = document.getElementById('userInput');
  const mensagem = input.value;
  input.value = '';

  const chatBox = document.getElementById('chatBox');

  addMenssage(mensagem, 'user')
  
  let resposta = await ChatPost(mensagem);
  
  // Verifique se a resposta contém o campo 'response' e se é uma string
  if (resposta.response && typeof resposta.response === 'string') {
    console.log(resposta.response);
    resposta.response = formatText(resposta.response);
    chatBox.innerHTML += `<p><strong>FURIA Bot:</strong> ${resposta.response}</p>`;
  } else {
    // Caso não seja string, exibe um erro ou trata de acordo
    chatBox.innerHTML += `<p><strong>Erro:</strong> ${resposta.message || 'Resposta inválida'}</p>`;
  }
}