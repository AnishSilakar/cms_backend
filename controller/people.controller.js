const {create, selectAll, update} = require("../service/people.service");


module.exports = {
    insert: async (req, res) => {
        const data = req.body;
        create(data, (err, results) => {
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
    getAll: async (req, res) => {
        selectAll(req, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                })
            } else {
                return res.status(200).json(
                    results
                )
            }
        });
    },
    update: async (req, res) => {
        let outerObject = req.body;
        let data = JSON.parse(outerObject.data);
        data.file = req.file;
        data.id = req.params.id;
        update(data, (err, results) => {
            if (err) {
                return res.status(500).json({message: err.message});
            } else {
                return res.status(200).json(results);
            }
        })
    }
}