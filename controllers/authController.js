const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const tokenModel = require('../models/tokenModel');
const { JWT_SECRET, REFRESH_SECRET, TOKEN_EXPIRY } = require('../config/jwt');

const signIn = async (req, res) => {
    const { id, password } = req.body;
    try {
        const user = await userModel.getUserById(id);
        if (!user) {
            return res.status(401).json({ message: 'Your login details are incorrect' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Your login details are incorrect' });
        }

        const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
        const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET);
        res.json({ accessToken, refreshToken });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    try {
        const payload = jwt.verify(refreshToken, REFRESH_SECRET);
        if (!payload) {
            return res.status(401).json({ message: 'Unknown or invalid refresh token' });
        }

        const accessToken = jwt.sign({ id: payload.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
        const newRefreshToken = jwt.sign({ id: payload.id }, REFRESH_SECRET);
        res.json({ accessToken, refreshToken: newRefreshToken });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const signUp = async (req, res) => {
    const { id, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await userModel.createUser(id, hashedPassword);

        const accessToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
        const refreshToken = jwt.sign({ id: userId }, REFRESH_SECRET);

        res.status(201).json({ accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const logout = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const deviceId = req.body.deviceId;

    if (!token || !deviceId) {
        return res.status(400).json({ message: 'Token or deviceId not found' });
    }

    await tokenModel.addInvalidatedToken(deviceId, token);
    res.json({ message: 'Logged out successfully from the device' });
};

module.exports = { signIn, signUp, refreshToken, logout };
