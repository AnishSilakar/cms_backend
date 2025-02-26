const FieldService = require('../service/field.service');
module.exports = {
    getAll: async (req, res) => {
        const fields = await FieldService.getAll();
        if(fields.length > 0){
            return res.status(200).json(fields);
        }
        return res.status(200).json(null);
    }
}