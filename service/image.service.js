const fs = require('fs');
const path = require('path');
const models = require('./model');

module.exports = {

    // singleFileUpload: async (req, res) => {
    //     try {
    //         if (!req.file) {
    //             return res.status(400).json({error: 'No file uploaded'});
    //         }
    //         const image = await db.create({
    //             name: req.file.originalname,
    //             filePath: req.file.filename,
    //             fileType: req.file.mimetype.split('/')[1]
    //         });
    //         res.status(201).json({message: 'Image uploaded successfully', id: image.id});
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({error: 'Failed to upload image'});
    //     }
    // },
    // getImage: async (req, res) => {
    //     try {
    //         const image = await db.findOne({where: {id: req.params.id}});
    //         if (!image) {
    //             return res.status(404).json({error: 'Image not found'});
    //         }
    //
    //         res.setHeader('Content-Type', `image/${image.fileType}`);
    //         res.sendFile(path.join(__dirname, '..', 'uploads', image.filePath));
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({error: 'Failed to retrieve image'});
    //     }
    // }
    getImage: async (data, callback) => {
        await models.Image.findOne({where: {id: data}}).then((image) => {
            return image;
        }).catch(err => {
                return callback(err);
            }
        )
        ;
    }
}