var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('*', function(req, res, next) {
  var name=req.url.substr(1);
  global.usermodel.find({username:name}, function(err,i) {
    basicRender(req,res,"User "+name,"profile/about-user");
  });
});

module.exports = router;
