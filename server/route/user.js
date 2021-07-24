const router = require("express").Router();
const User = require("../model/user");
const Post = require("../model/post");
const bcrypt = require("bcrypt");
const { verifyAccessToken } = require("../helper/jwt_helper");

//update
router.put("/:id", [verifyAccessToken], async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { password, ...other } = updateUser._doc;
      res.status(200).json(other);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("you can update only your account");
  }
});

//delete

router.delete("/:id", [verifyAccessToken], async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found");
    }
  } else {
    res.status(401).json("you can delete only your account");
  }
});

//get user

router.get("/:id", [verifyAccessToken], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
