import { ChatPost } from "../assets/api/chatAPI";
import { addMenssage } from "../assets/js/addMenssageFront";
import { formatText } from "../assets/js/formatText";
import { showLoader, hideLoader } from "../assets/js/loader";

export async function enviarMensagem() {
  const input = document.getElementById('userInput');
  const mensagem = input.value;
  input.value = '';

  const chatBox = document.getElementById('chatBox');

  addMenssage(mensagem, 'user')

  showLoader()
  try {
    let resposta = await ChatPost(mensagem);

    if (resposta.response && typeof resposta.response === 'string') {
      resposta.response = formatText(resposta.response);
      addMenssage(resposta.response, 'bot')
    } else {
      addMenssage(resposta.message, 'bot')
    }
  } catch (e) {
    console.error(e);
  } finally {
    hideLoader()
  }
}