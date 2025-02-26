const model = require("../models");

module.exports = {
    insert: async (data) => {
        const {landMark, mapUrl, email, phoneNumber} = data;
        return await model.ContactInformation.create({
            landMark,
            mapUrl,
            email,
            phoneNumber,
        });
    }
}