const db = require('../config/db');

const getUserById = async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

const createUser = async (id, password) => {
    const [result] = await db.query('INSERT INTO users (id, password) VALUES (?, ?)', [id, password]);
    return result.insertId;
};

const getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

module.exports = { getUserById, createUser, getAllUsers };
