import jwt from 'jsonwebtoken';
const jwtSecret = "Heythisispakashshivsharan";
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token == null) return res.status(401).json({ message: 'Token required' });

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

export default authenticateToken;
