import { decodeHTML } from "./decodeHtml";
import { getHours } from "./getHours";


export function addMenssage(menssage, type) {
    const chatBox = document.getElementById('chatBox');
    const chatMain = document.getElementById('chatMain');
    const typingLoader = document.getElementById('typingLoader');
    const hours = getHours();

    if (type === 'user') {
        const div_dialog = document.createElement('div');
        div_dialog.classList.add('dialog-user');

        const div_box = document.createElement('div');
        div_box.classList.add('box-user');
        div_box.innerHTML = menssage;

        const div_time = document.createElement('div');
        div_time.classList.add('time');
        div_time.innerHTML = hours;

        div_dialog.appendChild(div_box);
        div_dialog.appendChild(div_time);
        chatBox.insertBefore(div_dialog, typingLoader);

        chatMain.scrollTop = chatMain.scrollHeight;
    }

    if (type === 'bot') {
        typingLoader.classList.remove('hidden');
        chatMain.scrollTop = chatMain.scrollHeight;

        setTimeout(() => {
            typingLoader.classList.add('hidden');

            const div_dialog = document.createElement('div');
            div_dialog.classList.add('dialog-bot');

            const div_box = document.createElement('div');
            div_box.classList.add('box-bot');

            const div_time = document.createElement('div');
            div_time.classList.add('time');
            div_time.innerHTML = hours;

            div_dialog.appendChild(div_box);
            div_dialog.appendChild(div_time);
            chatBox.insertBefore(div_dialog, typingLoader);

            // 🔍 Decodifica o HTML antes de digitar
            const plainText = decodeHTML(menssage);
            let index = 0;

            const typingInterval = setInterval(() => {
                div_box.textContent += plainText.charAt(index);
                index++;

                chatMain.scrollTop = chatMain.scrollHeight;

                if (index >= plainText.length) {
                    clearInterval(typingInterval);
                }
            }, 35); // velocidade de digitação
        }, 1000); // tempo de "pensando"
    }
}
