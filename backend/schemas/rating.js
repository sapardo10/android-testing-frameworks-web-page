const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create')

// this will be our data base's data structure 
const RatingSchema = new Schema(
  {
    id: Number,
    userId:String,
    submissions:Array,
  },
  { timestamps: true }
);

RatingSchema.plugin(findOrCreate, { appendToArray: true});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Rating", RatingSchema);