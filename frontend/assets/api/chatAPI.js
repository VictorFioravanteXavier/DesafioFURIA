export async function ChatPost(mensagem) {
    try {
        const resposta = await fetch('/api/mensagem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: mensagem})
        });
    
        const json = await resposta.json();
        return json
      } catch (erro) {
        console.error('Erro ao enviar mensagem:', erro);
      }
}