var express = require('express');
var router = express.Router();
const Evaluation = require("../schemas/evaluation");
const Submission = require("../schemas/submission");
const Rating = require("../schemas/rating");
const User = require("../schemas/user");
var mongoose = require('mongoose');

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
        data.submissions = data.submissions.sort(compareSubmissionFunction);
        return res.json({ success: true, data: data });
    })
})

router.get('/get-rating/', (req, res) => {
    const userId = req.query.userId;
    const submissionId = req.query.submissionId;
    const id = req.params.id;
    Rating.findOne({ userId: userId }, (err, data) => {
        if (err) {
            console.log("errror", err);
            return res.json({ success: false, error: err });
        }
        if (data == null) {
            console.log("data is null");
            return res.json({ success: true, message: 'Evaluation with name ' + id + ' not found' });
        }
        var response = data.submissions.find(function (elem) {
            console.log("elem", elem);
            console.log("submission id", submissionId);
            return elem === submissionId;
        });
        console.log("response", response)
        if (response) {
            console.log("1")
            return res.json({ success: true, data: response });
        } else {
            return res.json({ success: true, message: 'Rating for the submission ' + submissionId + ' not found' });
        }

    })
})


compareSubmissionFunction = (a, b) => {
    if ((a.rating / a.amountRated) > (b.rating / b.amountRated)) {
        return -1;
    } else if ((a.rating / a.amountRated) < (b.rating / b.amountRated)) {
        return 1;
    } else {
        return 0;
    }
}

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
    console.log("new submission", req.body);
    const {
        userId,
        userEmail,
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
        || Number.isInteger(numericalEvaluation)) {
        console.log(req.body);
        return res.json({

            success: false,
            error: "INVALID INPUTS"
        });
    }

    var myId = mongoose.Types.ObjectId();
    evaluation.id = myId;
    evaluation.userId = userId;
    evaluation.userEmail = userEmail;
    evaluation.technologyId = technologyId;
    evaluation.techniqueId = techniqueId;
    evaluation.technologyName = technologyName;
    evaluation.techniqueName = techniqueName;

    submission.id = myId;
    submission.userId = userId;
    submission.userEmail = userEmail;
    submission.codesnippet = codesnippet;
    submission.youtubeurl = youtubeurl;
    submission.textEvaluation = textEvaluation;
    submission.numericalEvaluation = numericalEvaluation;
    submission.githubUrl = githubUrl;
    submission.rating = 500;
    submission.amountRated = 100;

    evaluation.submissions = [submission];

    evaluation.save(err => {
        console.log(err || "todo bien");
        if (err) return res.json({ success: false, error: err });
        submission.save(err => {
            console.log(err || "todo bien");
            if (err) return res.json({ success: false, error: err });
            User.findOneAndUpdate({ id: userId }, {
                $push: {
                    submissions: {
                        $each: [myId,],
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
    console.log("new submission", req.body);
    const {
        id,
        userId,
        userEmail,
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

    var myId = mongoose.Types.ObjectId();
    submission.id = myId;
    submission.userId = userId;
    submission.userEmail = userEmail;
    submission.codesnippet = codesnippet;
    submission.youtubeurl = youtubeurl;
    submission.textEvaluation = textEvaluation;
    submission.numericalEvaluation = numericalEvaluation;
    submission.githubUrl = githubUrl;
    submission.rating = 0;
    submission.amountRated = 0;

    console.log('submission', submission);

    Evaluation.findOneAndUpdate({ id: id }, {
        $push: {
            submissions: {
                $each: [submission,],
                $sort: { rating: -1 }
            }
        }
    }, err => {
        if (err) {
            console.log(err)
            return res.json({ success: false, error: err });
        } else {
            submission.save(err => {
                console.log(err || "todo bien");
                if (err) return res.json({ success: false, error: err });
                User.findOneAndUpdate({ id: userId }, {
                    $push: {
                        submissions: {
                            $each: [myId,],
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

        }
    });
});

router.post("/set-rating/", (req, res) => {
    console.log(req.body);
    const { userId, id, rating, submissionId } = req.body;
    Evaluation.findOneAndUpdate({
        _id: id,
        'submissions._id': submissionId,
    },
        {
            $inc: {
                'submissions.$.rating': rating,
                'submissions.$.amountRated': 1,
            },
        }, err => {
            if (err) {
                console.log(err)
            }
        });

    Rating.findOneAndUpdate({ userId: userId },
        {
            $addToSet: {
                submissions: {
                    $each: [submissionId,],
                },
            }
        }, (err, doc) => {
            console.log("sub id",submissionId);
            if (err) {
                return res.json({ success: false, error: err });
            } else if (!doc) {
                var ratingObj = new Rating();
                ratingObj.userId = userId
                ratingObj.submissions.push(submissionId);
                ratingObj.save(err => {
                    console.log(err || "todo bien");
                    if (err) return res.json({ success: false, error: err });
                    Submission.update({ id: submissionId }, {
                        $inc: {
                            'rating': rating,
                            'amountRated': 1,
                        },

                    }, err,sub => {
                        console.log("sub",sub);
                        if (err) {
                            console.log(err)
                            return res.json({ success: false, error: err });
                        } else {
                            return res.json({ success: true });
                        }
                    });
                });
            } else {
                Submission.update({ id: submissionId }, {
                    $inc: {
                        'rating': rating,
                        'amountRated': 1,
                    },

                }, err => {
                    if (err) {
                        console.log(err)
                        return res.json({ success: false, error: err });
                    } else {
                        return res.json({ success: true });
                    }
                });
            }
        }
    );





});

module.exports = router;