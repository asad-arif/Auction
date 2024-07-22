const express = require("express");
const router = express.Router();
const Users = require("../DB/users");

// Sign up
router.post("/signup", async (req, res) => {
  const user = new Users(req?.body);
  const result = await user.save();
  res.send(result);
});

// Log in
router.post("/login", async (req, res) => {
  const data = await Users.find(req.body);
  res.send(data);
});

// Edit user
router.put("/edit-user/:_id", async (req, res) => {
  const user = await Users.updateOne(req.params, req.body);
  res.send(user);
});

module.exports = router;
