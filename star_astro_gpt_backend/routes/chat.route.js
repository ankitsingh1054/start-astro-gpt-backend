const express = require('express');
const {askQuestion, getChat} = require('../controllers/chat.controller');
const verifyToken = require('../middlewares/verify_token.middleware');

const router = express.Router();

router.use(verifyToken);
router.post('/:id', askQuestion);
router.get('/:topic_id', getChat);

module.exports = router;
