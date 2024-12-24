const {insert, selectData} = require("../service/generalSetting.service");

module.exports = {
    insert: async (req, res) => {
        // Step 1: Parse the outer object to access the 'data' string
        let outerObject = req.body;

        // Step 2: Parse the 'data' string into a JavaScript object
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
    }
}