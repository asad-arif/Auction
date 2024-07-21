const mongoose = require("mongoose");

const uri =
  "mongodb+srv://asad:asad@auction.pdi0nqu.mongodb.net/?retryWrites=true&w=majority&appName=Auction";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });
