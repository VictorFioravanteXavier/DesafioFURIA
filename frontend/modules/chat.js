export async function enviarMensagem() {
  const input = document.getElementById('userInput');
  const mensagem = input.value;
  const chatBox = document.getElementById('chatBox');

  try {
    const resposta = await fetch('/api/mensagem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: mensagem })
    });

    const json = await resposta.json();

    if (resposta.ok) {
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
