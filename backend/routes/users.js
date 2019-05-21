var express = require('express');
var router = express.Router();
const Evaluation = require("../schemas/evaluation");
const Submission = require("../schemas/submission");
const User = require("../schemas/user");


router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/get/:id', (req, res) => {
    const id = req.params.id;
    User.findOne({ id: id }, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        if (data == null) return res.json({ success: true, message: 'User with id ' + id + ' not found' });
        return res.json({ success: true, data: data });
    })
})

router.post("/create", (req, res) => {
    let user = new User();
    console.log(req.body);
    const { id,
        email,
    } = req.body;

    if ((!email && email !== "")
        || !id) {
        console.log(req.body);
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }

    user.id = id;
    user.email = email;
    user.comments = [];
    user.submissions = [];
    user.admin = false;
    console.log("user",user);
    user.save(err => {
        console.log(err || "todo bien");
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});




module.exports = router;