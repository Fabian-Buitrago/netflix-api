const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verifyToken = require("../verifyToken");

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only yout account!");
  }
});

//DELETE
// router.delete("/:id", async (req, res, next) => {});

// //GET
// router.get("/:id", async (req, res, next) => {});

// //GET ALL
// router.get("/:id", async (req, res, next) => {});

// //GET USER STATS
// router.get("/:id", async (req, res, next) => {});

module.exports = router;
