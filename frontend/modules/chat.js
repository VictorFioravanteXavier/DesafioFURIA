export async function enviarMensagem() {
  const input = document.getElementById('userInput');
  const mensagem = input.value;
  const chatBox = document.getElementById('chatBox');

  try {
    // Recupera o contexto ou inicia com um array vazio
    let contexto = [];
    const contextoBruto = sessionStorage.getItem("context");
    if (contextoBruto) {
      try {
        contexto = JSON.parse(contextoBruto);
      } catch (e) {
        console.warn("Contexto inválido no sessionStorage, resetando...", e);
        sessionStorage.removeItem("context");
        contexto = [];
      }
    }

    // Envia a mensagem e o contexto para o backend
    const resposta = await fetch('/api/mensagem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: mensagem, context: contexto })
    });

    const json = await resposta.json();

    if (resposta.ok) {
      // Atualiza o contexto com a nova troca de mensagens
      contexto.push({ user: mensagem, chatBot: json.response });      
      sessionStorage.setItem("context", JSON.stringify(contexto));

      // Atualiza a interface
      chatBox.innerHTML += `<p><strong>Você:</strong> ${mensagem}</p>`;
      chatBox.innerHTML += `<p><strong>FURIA Bot:</strong> ${json.response}</p>`;
    } else {
      chatBox.innerHTML += `<p><strong>Erro:</strong> ${json.message}</p>`;
    }
  } catch (erro) {
    console.error('Erro ao enviar mensagem:', erro);
    chatBox.innerHTML += `<p><strong>Erro:</strong> Algo deu errado ao se comunicar com o servidor.</p>`;
  }

  input.value = '';
}
