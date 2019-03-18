var express = require('express');
var router = express.Router();
const Technique = require("../schemas/technique");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Techniques home page');
});

router.get("/get", (req, res) => {
    Technique.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
});

router.post("/create", (req, res) => {
    let technique = new Technique();
  
    const { id, name, description, type } = req.body;
  
    if ((!id && id !== 0)
    || !name || name === ""
    || !description || description === ""
    || !type || type === "") {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    }
    technique.id = id;
    technique.name = name;
    technique.description = description;
    technique.type = type;

    technique.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

module.exports = router;