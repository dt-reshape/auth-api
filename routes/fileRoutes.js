const express = require('express');
const upload = require('../middlewares/multerConfig');
const { uploadFile, listFiles, deleteFile, getFile, downloadFile, updateFile } = require('../controllers/fileController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.post('/upload', authenticate, upload.single('file'), uploadFile);
router.get('/list', authenticate, listFiles);
router.delete('/delete/:id', authenticate, deleteFile);
router.get('/:id', authenticate, getFile);
router.get('/download/:id', authenticate, downloadFile);
router.put('/update/:id', authenticate, upload.single('file'), updateFile);

module.exports = router;
