const db = require('../config/db');
const fs = require('fs');

const createFile = async (name, extension, mime_type, size, path) => {
    const [result] = await db.query(
        'INSERT INTO files (name, extension, mime_type, size, upload_date, path) VALUES (?, ?, ?, ?, NOW(), ?)',
        [name, extension, mime_type, size, path]
    );
    return result.insertId;
};

const getFileById = async (id) => {
    const [rows] = await db.query('SELECT * FROM files WHERE id = ?', [id]);
    return rows[0];
};

const getAllFiles = async (limit = 10, offset = 0) => {
    const [rows] = await db.query('SELECT * FROM files LIMIT ? OFFSET ?', [limit, offset]);
    return rows;
};

const deleteFileById = async (id) => {
    const [rows] = await db.query('SELECT * FROM files WHERE id = ?', [id]);
    if (rows.length === 0) return null;

    const file = rows[0];
    fs.unlinkSync(file.path);
    await db.query('DELETE FROM files WHERE id = ?', [id]);
    return file;
};

const updateFileById = async (id, name, extension, mime_type, size, path) => {
    const [rows] = await db.query('SELECT * FROM files WHERE id = ?', [id]);
    if (rows.length === 0) return null;

    const file = rows[0];
    fs.unlinkSync(file.path);

    await db.query(
        'UPDATE files SET name = ?, extension = ?, mime_type = ?, size = ?, upload_date = NOW(), path = ? WHERE id = ?',
        [name, extension, mime_type, size, path, id]
    );
    return { ...file, name, extension, mime_type, size, path };
};

module.exports = { createFile, getFileById, getAllFiles, deleteFileById, updateFileById };
