const multer = require('multer');
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';

const upload = multer({ dest: UPLOAD_DIR + '/' });

module.exports = upload;
