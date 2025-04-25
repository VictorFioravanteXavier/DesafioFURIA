import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/login';
import { enviarMensagem } from './modules/chat';

// Inicializa os formulários
const loginForm = new Login('.form-login');
const registerForm = new Login('.form-cadastro');

loginForm.init();
registerForm.init();

document.getElementById("enviarBtn").addEventListener('click', enviarMensagem);
