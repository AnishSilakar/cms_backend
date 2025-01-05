const MenuService = require('../service/menu.service');
const {Sequelize} = require("sequelize");

module.exports = {
    getAll: async (req, res) => {
        try {
            const data = await MenuService.getAll();
            return res.status(200).json(data);
        } catch (error) {
            // Extract the relevant message from the error
            const uniqueConstraintError = error.errors[0]; // Get the first error item
            const errorMessage = uniqueConstraintError.message; // Extract the message
            const fieldName = uniqueConstraintError.path; // Extract the field name that caused the error
            console.log(`Error: ${errorMessage} on field: ${fieldName}`);
            // return res.status(500).json({message: err.message});
        }

    }, insert: async (req, res) => {
        try {
            const data = req.body;
            const response = await MenuService.insert(data);
            if (!response) {
                return res.status(500).json({message: "Unable to insert menu"});
            }
            return res.status(200).json(response);
        } catch (error) {
            const uniqueConstraintError = error.errors[0];
            const errorMessage = uniqueConstraintError.message;
            const fieldName = uniqueConstraintError.path;
            return res.status(500).json({message: `Error: ${errorMessage} on field: ${fieldName}`});
        }
    }, update: async (req, res) => {
        try {
            const data = req.body;
            data.id = req.params.id;
            const response = await MenuService.update(data);
            if (response === undefined || response === null) {
                return res.status(500).json({message: `Menu with id ${data.id} not found`});
            }
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }, delete: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await MenuService.delete(id);
            if (response === undefined || response === null) {
                return res.status(500).json({message: `Menu with id ${id} not found`});
            }
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },
}