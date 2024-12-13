const {login, register} = require("../service/auth.service");

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
        const data = await req.body;
        register(data, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            } else {
                return res.status(200).json({results});
            }
        })
    }
}