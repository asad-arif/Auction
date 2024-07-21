const express = require("express");
const mongoose = require("mongoose");
require("./DB/config");
const Users = require("./DB/users");
const Auctions = require("./DB/auctions");
const Bids = require("./DB/bids");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Server is running");
});
app.post("/signup", async (req, res) => {
  const user = new Users(req?.body);
  const result = await user.save();
  res.send(result);
});
app.post("/login", async (req, res) => {
  const data = await Users.find(req.body);
  res.send(data);
});

app.put("/edit-user/:_id", async (req, res) => {
  const user = await Users.updateOne(req.params, req.body);
  res.send(user);
});

app.get("/get-all-auctions", async (req, res) => {
  const data = await Auctions.find().populate("userId", "name");
  res.send(data);
});
app.get("/get-auctions-by-userId/:userId", async (req, res) => {
  const data = await Auctions.find(req.params).populate("userId", "name");
  res.send(data);
});

app.get("/get-auction-by-id/:_id", async (req, res) => {
  const data = await Auctions.findOne(req.params);
  const bidData = await Bids.find({ auctionId: req.params });
  const responseData = {
    ...data._doc,
    bidData: bidData,
  };
  res.send(responseData);
});

app.post("/create-auction", async (req, res) => {
  const date = new Date();
  const auction = new Auctions({ ...req.body, createdDate: date });
  const result = await auction.save();
  res.send(result);
});

app.delete("/delete-auction/:_id", async (req, res) => {
  const data = await Auctions.deleteOne(req.params);
  res.send(data);
});

app.put("/edit-auction/:_id", async (req, res) => {
  const data = await Auctions.updateOne(req.params, { $set: req.body });
  res.send(data);
});

// app.get("/get-bids-by-id", async (req, res) => {
//   const data = await Bids.find(req.params);
//   res.send(data);
// });

app.post("/create-bid", async (req, res) => {
  const date = new Date();
  const bid = new Bids({ ...req.body, createdDate: date });
  const result = await bid.save();
  res.send(result);
});

app.listen(port, () => {
  console.log("Server is running");
});
