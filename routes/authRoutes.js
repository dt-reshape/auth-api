const express = require('express');
const { signIn, refreshToken, signUp, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/signin', signIn);
router.post('/signin/new_token', refreshToken);
router.post('/signup', signUp);
router.post('/logout', logout);

module.exports = router;
