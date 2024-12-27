const fs = require("fs");
const path = require("path");
const models = require("../models");

module.exports = {
  storeSingleImage: async (data) => {
    if (!data.file) {
      return null;
    }
    // absolute path
    const filePath = data.file.path;
    // Get the base path (usually the public folder)
    const basePath = path.join(process.cwd(), "public"); // Adjust this based on your project structure

    // Convert the image path to a relative path
    const relativePath = path.relative(basePath, filePath);

    const responseData = await models.Image.create({
      fileName: data.file.originalname,
      filePath: relativePath,
      fileType: data.file.mimetype.split("/")[1],
    });
    if (!responseData) {
      return null;
    }
    return responseData;
  },
  newStoreSingleImage: async (data) => {
    // absolute path
    const filePath = data.path;
    // Get the base path (usually the public folder)
    const basePath = path.join(process.cwd(), "public"); // Adjust this based on your project structure

    // Convert the image path to a relative path
    const relativePath = path.relative(basePath, filePath);

    const responseData = await models.Image.create({
      fileName: data.originalname,
      filePath: relativePath,
      fileType: data.mimetype.split("/")[1],
    });
    if (!responseData) {
      return null;
    }
    return responseData;
  },
  deleteFsFile: async (imageName) => {
    const mainFolder = __dirname;
    const newPath = path.dirname(mainFolder);
    const imagePath = path.join(newPath, "public", imageName);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      // Image deleted successfully
    });
  },
};
