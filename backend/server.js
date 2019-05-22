const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./schemas/data");
const Evaluation = require('./schemas/evaluation');
const cors = require('cors');
const technologies = require('./routes/technologies');
const techniques = require('./routes/techniques');
const evaluations = require('./routes/evaluations');
const users = require('./routes/users');
const comments = require('./routes/comments');

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const API_PORT = 3001;
const app = express();
const router = express.Router();

const dbRoute = "mongodb://"+'webpage'+":"+'elgatodejuan3'+"@ds147905.mlab.com:47905/android-testing-technologies";

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.use('/technologies', technologies);
app.use('/techniques', techniques);
app.use('/evaluations', evaluations);
app.use('/users', users);
app.use('/comments', comments);

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/createEvaluation", (req, res) => {
  let evaluationModel = new Evaluation();

  const {idtechnology, idtechnique,codesnippet,youtubeurl,evaluation,numericalevaluation} = req.body;

  if ((!idtechnology && idtechnology !== 0)
      || (!idtechnique && idtechnique !== 0)
      || !youtubeurl
      || !evaluation
      || !numericalevaluation) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  evaluationModel.idtechnology = idtechnology;
  evaluationModel.idtechnique = idtechnique;
  evaluationModel.codesnippet = codesnippet || "";
  evaluationModel.youtubeurl = youtubeurl;
  evaluationModel.evaluation = evaluation;
  evaluationModel.numericalevaluation = numericalevaluation;
  evaluationModel.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));