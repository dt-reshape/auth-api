const path = require('path');
const fileModel = require('../models/fileModel');

const uploadFile = async (req, res) => {
    const { originalname, mimetype, size } = req.file;
    const filePath = req.file.path;
    try {
        const fileId = await fileModel.createFile(originalname, path.extname(originalname), mimetype, size, filePath);
        res.status(201).json({ message: 'File uploaded successfully', fileId });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const listFiles = async (req, res) => {
    const listSize = parseInt(req.query.list_size, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * listSize;
    try {
        const files = await fileModel.getAllFiles(listSize, offset);
        res.json(files);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteFile = async (req, res) => {
    const fileId = req.params.id;
    try {
        const deletedFile = await fileModel.deleteFileById(fileId);
        if (!deletedFile) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.json({ message: 'File deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getFile = async (req, res) => {
    const fileId = req.params.id;
    try {
        const file = await fileModel.getFileById(fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.json(file);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const downloadFile = async (req, res) => {
    const fileId = req.params.id;
    try {
        const file = await fileModel.getFileById(fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.download(file.path);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateFile = async (req, res) => {
    const fileId = req.params.id;
    const { originalname, mimetype, size } = req.file;
    const filePath = req.file.path;
    try {
        const updatedFile = await fileModel.updateFileById(fileId, originalname, path.extname(originalname), mimetype, size, filePath);
        if (!updatedFile) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.json({ message: 'File updated successfully', file: updatedFile });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { uploadFile, listFiles, deleteFile, getFile, downloadFile, updateFile };
