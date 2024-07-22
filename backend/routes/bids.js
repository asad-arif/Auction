const express = require("express");
const router = express.Router();
const Bids = require("../DB/bids");

// Create bid
router.post("/create-bid", async (req, res) => {
  const date = new Date();
  const bid = new Bids({ ...req.body, createdDate: date });
  const result = await bid.save();
  res.send(result);
});

module.exports = router;
