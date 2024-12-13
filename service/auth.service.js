const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    login: async (data, callBack) => {
        const {email, password} = data;
        const user = await models.User.findOne({where: {email}});
        if (!user) {
            return callBack("User not found");
        }
        const expiresIn = '1h';
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn});

        // Calculate expiration date
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1); // Adjust based on your expiresIn

        const resData = {
            email: user.email,
            userId: user.id,
            username: user.username,
            token: token,
            expiresIn: expiresIn,
            // validTil: expirationDate.toISOString() // Return expiration time in ISO format
        }

        return callBack(null, resData);
    },
    register: async (data, callBack) => {
        const {email, password, username} = data;
        const hashedPassword = await bcrypt.hash(data.password, 10);
        try {
            const user = await models.User.findOrCreate({
                where: {email: email},
                defaults: {username, email, password: hashedPassword},
            });
            return callBack(null, user);
        } catch (error) {
            return callBack(error);
        }
    }
}