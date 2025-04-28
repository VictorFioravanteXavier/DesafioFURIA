import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { enviarMensagem } from './modules/chat';

document.getElementById("enviarBtn").addEventListener('click', enviarMensagem);
