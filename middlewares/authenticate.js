const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');
const tokenModel = require('../models/tokenModel');

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const deviceId = req.headers['device-id'];

    if (!token || !deviceId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (await tokenModel.isTokenInvalidated(deviceId, token)) {
        return res.status(401).json({ message: 'Token is invalidated for this device' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authenticate;
