const express = require('express');
const router = express.Router();

const homeController = require('./src/controllers/homeController');
const chatController = require('./src/controllers/chatController');

// Rotas da Home
router.get('/', homeController.index);

// Rotas Chat
router.post('/mensagem', chatController.sendMessage);

module.exports = router;