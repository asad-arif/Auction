const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  domainName: String,
  description: String,
  minBidPrice: String,
  price: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  duration: String,
  createdDate: String,
});

module.exports = mongoose.model("auctions", auctionSchema);
