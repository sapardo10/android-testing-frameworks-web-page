const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema(
  {
    id:String,
    technologyId: Number,
    techniqueId: Number,
    technologyName: String,
    techniqueName: String,
    codesnippet: String,
    youtubeurl: String,
    textEvaluation: String,
    numericalEvaluation: Number,
    githubUrl: String,
    rating: Number,
    amountRated: Number,
    userId:String,
    userEmail:String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", SubmissionSchema);