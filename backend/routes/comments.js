var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Comment = require("../schemas/comment");
const User = require("../schemas/user");

router.get('/get/:submissionId', (req, res) => {
    const submissionId = req.params.submissionId;
    console.log("submission ",submissionId);
    Comment.find({ submissionId: submissionId }, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        if (data == null) return res.json({ success: true, message: 'comments for submission with id ' + id + ' not found' });
        console.log("res" + data);
        return res.json({ success: true, data: data });
    })
})

router.post("/post", (req, res) => {
    let comment = new Comment();
    console.log("new comment", req.body);
    const {
        userId,
        userEmail,
        content,
        submissionId,
    } = req.body;

    if (!userId || userId === ""
        || !userEmail || userEmail === ""
        || !content || content === ""
        || !submissionId || submissionId === ""
        || content.length > 500) {
        console.log(req.body);
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    var myId = mongoose.Types.ObjectId();

    comment.id = myId;
    comment.userId = userId;
    comment.userEmail = userEmail;
    comment.content = content;
    comment.submissionId = submissionId;

    comment.save(err => {
        console.log(err || "todo bien");
        if (err) return res.json({ success: false, error: err });
        User.findOneAndUpdate({ id: userId }, {
            $push: {
                comments: {
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

module.exports = router;