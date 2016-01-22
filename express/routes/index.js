var express = require('express');
var router = express.Router();
var ejs=require("ejs");
var fs=require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var page={
    title:"Home",
    blocks: {
      
    }
  };
  //ejs.render(fs.readFileSync("./express/elements/base.ejs").toString(),{ejs:ejs,user:req.user,page:page,fs:fs},{});
  res.render('base',{ejs:ejs,user:req.user,page:page,fs:fs});
});

module.exports = router;
