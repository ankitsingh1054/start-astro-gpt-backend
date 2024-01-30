const express = require('express');
const {getTopics, createMatchMakingTopic, createTopic} = require('../controllers/topic.controller');
const verifyToken = require('../middlewares/verify_token.middleware');

const router = express.Router();

router.use(verifyToken);
router.get('/', getTopics);
router.post('/', createTopic);
router.post('/match', createMatchMakingTopic);

module.exports = router;
