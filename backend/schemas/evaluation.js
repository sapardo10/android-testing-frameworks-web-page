const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EvaluationSchema = new Schema(
  {
    idtechnology: String,
    idtechnique: String,
    codesnippet: String,
    youtubeurl: String,
    evaluation: String,
    numericalevaluation: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evaluation", EvaluationSchema);