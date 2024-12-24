const model = require("../models");

module.exports = {
    insert: async (data) => {
        const insertedData = await model.ContactInformation.create(data);
        return insertedData;
    }
}