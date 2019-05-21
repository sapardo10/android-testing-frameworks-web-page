const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Submission = require('./submission');

const EvaluationSchema = new Schema(
  {
    id:String,
    userId: String,
    technologyId: Number,
    techniqueId: Number,
    technologyName: String,
    techniqueName: String,
    submissions: [Submission.schema],
    codesnippet: String,
    youtubeurl: String,
    textEvaluation: String,
    numericalEvaluation: Number,
    githubUrl: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evaluation", EvaluationSchema);