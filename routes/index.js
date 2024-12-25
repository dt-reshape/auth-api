const express = require('express');
const authRoutes = require('./authRoutes');
const fileRoutes = require('./fileRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/files', fileRoutes);
router.use('/user', userRoutes);

module.exports = router;
