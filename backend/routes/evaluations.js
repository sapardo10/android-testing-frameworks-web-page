var express = require('express');
var router = express.Router();
const Evaluation = require("../schemas/evaluation");
const Submission = require("../schemas/submission");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.get('/', function (req, res) {
    res.send('Evaluations home page');
});

router.get("/get", (req, res) => {
    Evaluation.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.get('/get/:id', (req, res) => {
    const id = req.params.id;
    Evaluation.findOne({ id: id }, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        if (data == null) return res.json({ success: true, message: 'Evaluation with name ' + id + ' not found' });
        console.log(data);
        return res.json({ success: true, data: data });
    })
})

router.get('/technology/:name', (req, res) => {
    const name = req.params.name;
    Evaluation.find({ technologyName: name }, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        if (data == null) return res.json({ success: true, message: 'Evaluation with name ' + id + ' not found' });
        console.log(data);
        return res.json({ success: true, data: data });
    })
})

router.get('/technique/:name', (req, res) => {
    const name = req.params.name;
    Evaluation.find({ techniqueName: name }, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        if (data == null) return res.json({ success: true, message: 'Evaluation with name ' + id + ' not found' });
        console.log(data);
        return res.json({ success: true, data: data });
    })
})

// this is our update method
// this method overwrites existing data in our database
router.post("/update", (req, res) => {
    const { id, update } = req.body;
    Evaluation.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post("/create", (req, res) => {
    let submission = new Submission();
    let evaluation = new Evaluation();

    const { id,
        technologyId,
        techniqueId,
        technologyName,
        techniqueName,
        codesnippet,
        youtubeurl,
        textEvaluation,
        numericalEvaluation,
        githubUrl } = req.body;

    if ((!technologyName && technologyName !== "")
        || (!techniqueName && techniqueName !== "")
        || !textEvaluation || textEvaluation === ""
        || !numericalEvaluation
        || Number.isInteger(numericalEvaluation)
        || !id
        || Number.isInteger(id)) {
        console.log(req.body);
        return res.json({

            success: false,
            error: "INVALID INPUTS"
        });
    }

    evaluation.id = id;
    evaluation.technologyId = technologyId;
    evaluation.techniqueId = techniqueId;
    evaluation.technologyName = technologyName;
    evaluation.techniqueName = techniqueName;

    submission.codesnippet = codesnippet;
    submission.youtubeurl = youtubeurl;
    submission.textEvaluation = textEvaluation;
    submission.numericalEvaluation = numericalEvaluation;
    submission.githubUrl = githubUrl;
    submission.rating = 5;
    submission.amountRated = 100;

    evaluation.submissions = [submission];

    evaluation.save(err => {
        console.log(err || "todo bien");
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post("/update", (req, res) => {
    const { id, update } = req.body;
    Evaluation.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post("/create-new", (req, res) => {
    let submission = new Submission();

    const {
        id,
        codesnippet,
        youtubeurl,
        textEvaluation,
        numericalEvaluation,
        githubUrl, } = req.body;

    if (!textEvaluation || textEvaluation === ""
        || !numericalEvaluation
        || Number.isInteger(numericalEvaluation)) {
        console.log(req.body);
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }

    submission.codesnippet = codesnippet;
    submission.youtubeurl = youtubeurl;
    submission.textEvaluation = textEvaluation;
    submission.numericalEvaluation = numericalEvaluation;
    submission.githubUrl = githubUrl;
    submission.rating = 0;
    submission.amountRated = 0;

    console.log('submission', submission);
    console.log('evaluation', id);

    Evaluation.findOneAndUpdate({ id: id }, {
        $push: {
            submissions: {
                $each: [ submission, ],
                $sort: { rating: -1 }
            }
        }
    }, err => {
        if (err) {
            console.log(err)
            return res.json({ success: false, error: err });
        } else {
            return res.json({ success: true });
        }
    });
});

module.exports = router;