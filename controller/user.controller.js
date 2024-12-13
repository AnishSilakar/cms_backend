const {index} = require("../service/user.service");

module.exports = {
    selectAll: async (req, res) => {
        index(req, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
            return res.status(200).json(
                results
            )
        });
    }
}