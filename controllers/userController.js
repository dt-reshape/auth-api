const userModel = require('../models/userModel');

const getUserInfo = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ id: user.id });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getUserInfo };
