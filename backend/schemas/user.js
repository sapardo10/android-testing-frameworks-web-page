const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create')

// this will be our data base's data structure 
const UserSchema = new Schema(
  {
    id: String,
    email:String,
    comments:Array,
    admin: Boolean,
    submissions:Array,
    displayName:String,
  },
  { timestamps: true }
);

UserSchema.plugin(findOrCreate, { appendToArray: true});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);