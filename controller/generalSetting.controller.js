const {
    insert,
    selectData,
    update,
} = require("../service/generalSetting.service");

module.exports = {
    insert: async (req, res) => {
        let outerObject = req.body;
        let data = JSON.parse(outerObject.data);
        data.logo = req.files.logo;
        data.favIcon = req.files.favIcon;
        insert(data, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                });
            } else {
                return res.status(200).json(result);
            }
        });
    },
    getData: async (req, res) => {
        selectData(req, (err, results) => {
            if (err) {
                return res.status(500).json({message: err.message});
            } else {
                return res.status(200).json(results);
            }
        });
    },
    update: async (req, res) => {
        let outerObject = req.body;
        let data = JSON.parse(outerObject.data);
        data.files = req.files;
        data.id = req.params.id;
        update(data, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                });
            } else {
                return res.status(200).json(result);
            }
        });
    },
};
