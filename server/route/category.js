const router = require("express").Router();
const category = require("../model/category");
const Category = require("../model/category");
const { verifyAccessToken } = require("../helper/jwt_helper");

//create a new category
router.post("/", [verifyAccessToken], async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const cat = await Category.find();
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
