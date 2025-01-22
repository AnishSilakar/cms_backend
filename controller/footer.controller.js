const FooterService = require("../service/footer.service");
module.exports = {
  insert: async (req, res) => {
    let outerObject = req.body;
    let data = JSON.parse(outerObject.data);
    data.file = req.files.file;
    const result = await FooterService.insert(data);
    if (result) {
      return res
        .status(200)
        .json({ message: "Footer Data Inserted Successfully !!" });
    }
    return res.status(500).json({ message: "Something Went Wrong !!!" });
  },
  getFooter: async (req, res) => {
    const result = await FooterService.get();
    return res.status(200).json(result);
  },
  updateFooter: async (req, res) => {
    let outerObject = req.body;
    let data = JSON.parse(outerObject.data);
    data.id = req.params.id;
    data.file = req.files.file;
    const result = await FooterService.update(data);
    if (result) {
      return res
        .status(200)
        .json({ message: "Footer Data Updated Successfully !!" });
    }
    return res.status(500).json({ message: "Something Went Wrong !!!" });
  },
};
