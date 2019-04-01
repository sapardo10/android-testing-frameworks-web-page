var express = require('express');
var router = express.Router();
const Technology = require("../schemas/technology");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Technologies home page');
});

router.get("/get", (req, res) => {
    Technology.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
});

router.get('/get/:id',(req,res) => {
    const id = req.params.id;
    Technology.findOne({id:id}, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        if (data==null) return res.json({ success: true, message: 'Technology with name '+name+' not found' });
        console.log(data);
        return res.json({success:true, data:data});
    })
})

router.post("/create", (req, res) => {
    let tech = new Technology();
  
    const { id, name, creator, description, url, imageurl } = req.body;
  
    if ((!id && id !== 0)
    || !name || name === ""
    || !description || description === ""
    || !url || url === ""
    || !creator
    || !imageurl) {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    }
    tech.id = id;
    tech.name = name;
    tech.creator = creator;
    tech.description = description;
    tech.url = url;
    tech.imageurl = imageurl;

    tech.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

module.exports = router;