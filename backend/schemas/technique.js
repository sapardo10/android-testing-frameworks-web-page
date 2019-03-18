const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TechniqueSchema = new Schema(
  {
    id: Number,
    name: String,
    description: String,
    type:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Technique", TechniqueSchema);