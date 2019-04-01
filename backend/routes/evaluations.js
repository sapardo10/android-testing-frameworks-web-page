var express = require('express');
var router = express.Router();
const Evaluation = require("../schemas/evaluation");

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

router.get('/get/:id',(req,res) => {
    const id = req.params.id;
    Evaluation.findOne({id:id}, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        if (data==null) return res.json({ success: true, message: 'Evaluation with name '+id+' not found' });
        console.log(data);
        return res.json({success:true, data:data});
    })
})

router.get('/technology/:name',(req,res) => {
    const name = req.params.name;
    Evaluation.find({technologyName:name}, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        if (data==null) return res.json({ success: true, message: 'Evaluation with name '+id+' not found' });
        console.log(data);
        return res.json({success:true, data:data});
    })
})

router.get('/technique/:name',(req,res) => {
    const name = req.params.name;
    Evaluation.find({techniqueName:name}, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        if (data==null) return res.json({ success: true, message: 'Evaluation with name '+id+' not found' });
        console.log(data);
        return res.json({success:true, data:data});
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
    evaluation.codesnippet = codesnippet;
    evaluation.youtubeurl = youtubeurl;
    evaluation.textEvaluation = textEvaluation;
    evaluation.numericalEvaluation = numericalEvaluation;
    evaluation.githubUrl = githubUrl;

    evaluation.save(err => {
        console.log(err || "todo bien");
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

module.exports = router;