var express = require('express');
var router = express.Router();
var ejs=require("ejs");
var fs=require("fs");

function basicRender(req,res,title,page,e) {
  if (!e) e={};
  var pag={
    title:title,
    html:ejs.render(fs.readFileSync("./express/pages/"+page+".ejs").toString(),e,{})
  };
  //ejs.render(fs.readFileSync("./express/elements/base.ejs").toString(),{ejs:ejs,user:req.user,page:page,fs:fs},{});
  res.render('base',{ejs:ejs,user:req.user,page:pag,fs:fs});
}

//TODO: add better render and elements

global.basicRender=basicRender;
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  basicRender(req,res,"Home","index");
});

router.get("/Username", function(req,res,next) {
  basicRender(req,res,"Select your Username","username",{message:req.flash("usernameChange")});
});

router.post("/Username", function(req,res,next) {
  if (!req.body.name) {req.flash("usernameChange","No Username set");}
  req.user.username=req.body.name;
  req.user.save(function(err) {
    if (err) {
      req.flash("usernameChange",err);
    } else {
      req.flash("usernameChange","Username set to "+req.body.name);
    }
    res.redirect("/Username");
  });
});

module.exports = router;
