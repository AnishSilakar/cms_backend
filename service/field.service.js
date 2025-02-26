const models = require('../models');
class FieldService {
     getAll = async () => {
        return await models.Field.findAll();
     }
 }

 module.exports = new FieldService();