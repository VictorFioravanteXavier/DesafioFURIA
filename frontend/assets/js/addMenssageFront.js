import { getHours } from "./getHours";

export function addMenssage(menssage, type) {
    const chatBox = document.getElementById('chatBox');
    const chatMain = document.getElementById('chatMain'); // <- Seleciona a MAIN agora
    const hours = getHours();

    if (typeof type === 'string' && type === 'user') {
        chatBox.innerHTML += `
            <div class="dialog-user">
                <div class="box-user">
                    ${menssage}
                </div>
                <div class="time">
                    ${hours}
                </div>
            </div>
        `;

        setTimeout(() => {
            chatMain.scrollTop = chatMain.scrollHeight;
        }, 0);
    }


    if (typeof type === 'string' && type === 'bot') {
        chatBox.innerHTML += `
            <div class="dialog-bot">
                <div class="box-bot">
                    ${menssage}
                </div>
                <div class="time">
                    ${hours}
                </div>
            </div>
        `;

        setTimeout(() => {
            chatMain.scrollTop = chatMain.scrollHeight;
        }, 0);
    }
}
