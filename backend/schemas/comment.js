const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create')

// this will be our data base's data structure 
const CommentSchema = new Schema(
  {
    id: String,
    userId:String,
    evaluationId:String,
    submissionId:String,
    //ratings:Array,
    userEmail:String,
    content: String,
  },
  { timestamps: true }
);

CommentSchema.plugin(findOrCreate, { appendToArray: true});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Comment", CommentSchema);