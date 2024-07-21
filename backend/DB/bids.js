const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  userId: String,
  auctionId: String,
  bidPrice: String,
});

module.exports = mongoose.model("bids", bidSchema);
