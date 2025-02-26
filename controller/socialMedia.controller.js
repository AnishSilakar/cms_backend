const {insert, selectAll, destroy, update} = require("../service/socialMedia.service");
module.exports = {
    insert: async (req, res) => {
        const data = req.body;
        insert(data, (err, result) => {
            if (err) {
                return res.status(400).send({message: err});
            }
            return res.status(200).json(result);
        })
    },
    selectAll: async (req, res) => {
        selectAll(req, (err, results) => {
            if (err) {
                return res.status(500).send({message: err.message});
            }
            return res.status(200).json(results);
        })
    },
    delete: async (req, res) => {
        const id = req.params.id;
        destroy(id, (err, result) => {
            if (err) {
                return res.status(500).send({message: err.message});
            }
            return res.status(200).json(result);
        })
    },
    update: async (req, res) => {
        let data = req.body;
        data.id = req.params.id;
        update(data, (err, result) => {
            if (err) {
                return res.status(500).send({message: err.message});
            }
            return res.status(200).json(result);
        });
    }
}