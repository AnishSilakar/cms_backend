const {login, register, refreshAccessToken, logout} = require("../service/auth.service");

module.exports = {
    login: async (req, res) => {
        const data = req.body;
        login(data, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            } else {
                return res.status(200).json(results);
            }
        })
    }, register: async (req, res) => {
        // Step 1: Parse the outer object to access the 'data' string
        let outerObject = req.body;

        // Step 2: Parse the 'data' string into a JavaScript object
        let data = JSON.parse(outerObject.data);
        data.file = req.file;

        register(data, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            } else {
                return res.status(200).json(results);
            }
        })
    },
    refreshToken: async (req, res) => {
        const data = req.body;
        refreshAccessToken(data, (err, results) => {
            if (err) {
                res.status(err).json({
                    message: err.message
                })
            } else {
                res.status(200).json(results);
            }
        })
    },
    logout: async (req, res) => {
        logout(req, (err, results) => {
            if (err) {
                return res.status(500).json({message: err.message});
            }
            res.status(200).json(results);
        })
    }
}