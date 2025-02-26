const jwt = require("jsonwebtoken");
const models = require("../models");

const authMiddleware = async (req, res, next) => {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if (!accessToken) {
        return res.status(401).json({"message": "No token provided"});
    }
    const tokens = await models.TokenManager.findOne({where: {accessToken}});
    if (!tokens) {
        return res.status(401).json({"message": "Invalid Access Token"});
    }
    const now = new Date(Date.now());
    if (now > new Date(tokens.accessExpiresIn)) {
        return res.status(401).json({"message": "Access Token is Expired"});
    }
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({"message": "Invalid token provided"});
        }
        req.userId = decoded.id; // Store user ID for later use
        next();

    });
};
module.exports = authMiddleware;