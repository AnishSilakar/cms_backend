const FormService = require('../service/form.service');
module.exports = {
    insert : async (req, res) => {
        const data = req.body;
        const formdata = await FormService.insert(data);
        if(formdata){
            return res.status(200).json({message:"Form inserted Successfully"});
        }
        return res.status(500).json({message:"Something went wrong"});
    },
    findAll : async (req, res) => {
        const formdata = await FormService.findAll();
        if(formdata){
            return res.status(200).json(formdata);
        }
        return res.status(500).json({message:"Something went wrong"});
    },
    delete: async (req, res) => {
        const id = req.params.id;
        const formdata = await FormService.delete(id);
        if(formdata){
            return res.status(200).json({message:"Form deleted Successfully"});
        }
        return res.status(500).json({message:"Something went wrong"});
    }
}