const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your_refresh_secret';
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || '10m';

module.exports = { JWT_SECRET, REFRESH_SECRET, TOKEN_EXPIRY };
