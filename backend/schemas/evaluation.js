const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EvaluationSchema = new Schema(
  {
    id:Number,
    technologyId: Number,
    techniqueId: Number,
    technologyName: String,
    techniqueName: String,
    codesnippet: String,
    youtubeurl: String,
    textEvaluation: String,
    numericalevaluation: Number,
    githubUrl: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evaluation", EvaluationSchema);