const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TechnologySchema = new Schema(
  {
    id: Number,
    name: String,
    creator: String,
    description: String,
    url: String,
    imageurl:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Technology", TechnologySchema);