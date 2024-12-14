const {index, update, remove} = require("../service/user.service");

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
    },
    update: async (req, res) => {
        const data = req.body;
        data.id = req.params.id;
        update(data, (err, results) => {
            if (err) return res.status(500).json({message: err.message});
            return res.status(200).json(results);
        })
    },
    delete: async (req, res) => {
        const id = req.params.id;
        remove(id, (err, results) => {
            if (err) return res.status(500).json({message: err.message});
            return res.status(200).json(results);
        })
    }
}