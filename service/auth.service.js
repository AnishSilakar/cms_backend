const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const dotenv = require('dotenv');
dotenv.config();

const removeOldTokens = async (userId) => {
    const tokens = await models.TokenManager.findOne({where: {userId: userId}});
    if (tokens) {
        await models.TokenManager.destroy({where: {userId}});
    }
}

const generateTokens = async (user) => {
    await removeOldTokens(user.id);
    const expiresIn = '1h';
    const accessFulldate = new Date(Date.now() + (1 / 24) * 24 * 60 * 60 * 1000);
    // Generate Access Token
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn});
    // Generate refresh token
    const refreshExpiry = '2h';
    const refreshFulldate = new Date(Date.now() + (2 / 24) * 24 * 60 * 60 * 1000);
    const refreshToken = jwt.sign({id: user.id}, process.env.REFRESH_JWT_SECRET, {expiresIn: refreshExpiry});
    // Store refresh token in database

    const aa = await models.TokenManager.create({
        accessToken: token,
        accessExpiresIn: accessFulldate,
        refreshToken: refreshToken,
        refreshExpiresIn: refreshFulldate,
        UserId: user.id
    });

    // Calculate expiration date
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1); // Adjust based on your expiresIn

    return data = {
        token: token,
        expiresIn: expiresIn,
        refreshToken: refreshToken,
        refreshExpiresIn: refreshExpiry,
    }
}

module.exports = {
    login: async (data, callBack) => {
        const {email, password} = data;
        const user = await models.User.findOne({where: {email}});
        if (!user) {
            return callBack({
                message: "User not found",
            });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return callBack({
                message: "Invalid Password",
            });
        } else {
            const responsedata = await generateTokens(user);
            const resData = {
                email: user.email,
                userId: user.id,
                username: user.username,
                token: responsedata.token,
                expiresIn: responsedata.expiresIn,
                refreshToken: responsedata.refreshToken,
                refreshExpiresIn: responsedata.refreshExpiresIn,
                // validTil: expirationDate.toISOString() // Return expiration time in ISO format
            }
            return callBack(null, resData);
        }
    },
    register: async (data, callBack) => {
        const {email, password, people} = data;
        const {dateOfBirth, address, gender, lastName, firstName} = people;
        const hashedPassword = await bcrypt.hash(password, 10);
        const username = firstName.concat(lastName);
        try {
            const user = await models.User.create({username, email, password: hashedPassword});
            let image = null;
            if (data?.file) {
                image = await models.Image.create({
                    fileName: data.file.originalname,
                    filePath: data.file.path,
                    fileType: data.file.mimetype.split('/')[1]
                })
            }
            if (user) {
                const people = await models.People.create({
                    firstName,
                    lastName,
                    address,
                    gender,
                    dateOfBirth,
                    userId: user.id,
                    imageId: image ? image.id : null
                });
                const resData = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    people: people.dataValues,
                }
                return callBack(null, resData);
            }
            return callBack({
                message: "User not registered",
            });

        } catch (error) {
            return callBack(error);
        }
    },
    refreshAccessToken: async (data, callback, status) => {
        const refreshToken = data.refreshToken;
        const results = {
            message: "Missing token"
        }
        if (!refreshToken) {
            return callback(results);
        }
        // check if token is present in databse or not
        const storedToken = await models.TokenManager.findOne({where: {refreshToken}});
        if (!storedToken) {
            results.message = "Missing refresh token";
            return callback(results);
        }
        const now = new Date(Date.now());
        if (now < new Date(storedToken.refreshExpiresIn)) {
            // Verify refresh token
            jwt.verify(storedToken.refreshToken, process.env.REFRESH_JWT_SECRET, async (err, user) => {
                if (err) {
                    return callback(err);
                }
                // issue here not new data stored in db
                return callback(null, await generateTokens(user));
            })
        } else {
            // Remain to delete expire token
            results.message = "Refresh Token Expired";
            return callback(results);
        }
    },
    logout: async (req, callBack) => {
        const accessToken = req.headers['authorization']?.split(' ')[1];
        if (!accessToken) return callBack("Missing token");

        const tokenExist = await models.TokenManager.findOne({where: {accessToken}});
        if (tokenExist) {
            // Remove the refresh token from the database
            await models.TokenManager.destroy({where: {accessToken}});
            const result = {
                message: "Logout successfully",
            }
            return callBack(null, result);
        }
        const notFoundResult = {
            message: "Token Not Found"
        }
        return callBack(notFoundResult);
    }

}