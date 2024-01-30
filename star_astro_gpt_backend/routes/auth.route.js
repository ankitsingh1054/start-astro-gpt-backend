const express = require('express');
const {register, login, userData, getUserData} = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/verify_token.middleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/userdata', verifyToken, userData);
router.get('/userdata', verifyToken, getUserData);

module.exports = router;
