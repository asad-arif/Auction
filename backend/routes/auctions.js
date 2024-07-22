const express = require("express");
const router = express.Router();
const Auctions = require("../DB/auctions");
const Bids = require("../DB/bids");

// Get all auctions
router.get("/get-all-auctions", async (req, res) => {
  const data = await Auctions.find().populate("userId", "name");
  res.send(data);
});

// Get auctions by userId
router.get("/get-auctions-by-userId/:userId", async (req, res) => {
  const data = await Auctions.find(req.params).populate("userId", "name");
  res.send(data);
});

// Get auction by id
router.get("/get-auction-by-id/:_id", async (req, res) => {
  const data = await Auctions.findOne(req.params);
  const bidData = await Bids.find({ auctionId: req.params });
  const responseData = {
    ...data._doc,
    bidData: bidData,
  };
  res.send(responseData);
});

// Create auction
router.post("/create-auction", async (req, res) => {
  const date = new Date();
  const auction = new Auctions({ ...req.body, createdDate: date });
  const result = await auction.save();
  res.send(result);
});

// Delete auction
router.delete("/delete-auction/:_id", async (req, res) => {
  const data = await Auctions.deleteOne(req.params);
  res.send(data);
});

// Edit auction
router.put("/edit-auction/:_id", async (req, res) => {
  const data = await Auctions.updateOne(req.params, { $set: req.body });
  res.send(data);
});

module.exports = router;
