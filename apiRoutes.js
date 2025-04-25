const express = require('express');
const router = express.Router();
const chatController = require('./src/controllers/chatController');

router.post('/mensagem', chatController.sendMessage); // sem CSRF aqui

module.exports = router;