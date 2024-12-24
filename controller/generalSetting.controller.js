const {insert, selectData, update} = require("../service/generalSetting.service");

module.exports = {
    insert: async (req, res) => {
        let outerObject = req.body;
        let data = JSON.parse(outerObject.data);
        data.file = req.file;
        insert(data, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            } else {
                return res.status(200).json(result);
            }
        })
    },
    getData: async (req, res) => {
        selectData(req, (err, results) => {
            if (err) {
                return res.status(500).json({message: err.message});
            } else {
                return res.status(200).json(results);
            }
        })
    },
    update: async (req, res) => {
        let outerObject = req.body;
        let data = JSON.parse(outerObject.data);
        data.file = req.file;
        data.id = req.params.id;
        update(data, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            } else {
                return res.status(200).json(result);
            }
        })
    },
}