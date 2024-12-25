const db = require('../config/db');

const addInvalidatedToken = async (deviceId, token) => {
    const query = 'INSERT INTO invalidated_tokens (device_id, token) VALUES (?, ?)';
    await db.query(query, [deviceId, token]);
};

const isTokenInvalidated = async (deviceId, token) => {
    const query = 'SELECT 1 FROM invalidated_tokens WHERE device_id = ? AND token = ?';
    const [rows] = await db.query(query, [deviceId, token]);
    return rows.length > 0;
};

module.exports = { addInvalidatedToken, isTokenInvalidated };
