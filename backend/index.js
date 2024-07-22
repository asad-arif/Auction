const express = require("express");
const mongoose = require("mongoose");
require("./DB/config");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/users");
const auctionRoutes = require("./routes/auctions");
const bidRoutes = require("./routes/bids");

app.use("", userRoutes);
app.use("", auctionRoutes);
app.use("", bidRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
