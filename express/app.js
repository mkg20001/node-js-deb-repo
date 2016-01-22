var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));


////
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = logger;
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var MongoStore = require('connect-mongodb-session')(session);
var store = new MongoStore(
  {
    uri: global.c.s("db"),
    collection: 'sessions'
  });

// configuration ===============================================================
mongoose.connect(global.c.s("db")); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
//app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: global.c.g("secret"), resave: true, saveUninitialized: true, store:store,cookie: { maxAge: 3600*24*30} })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
var router=express.Router();
require('./routes/auth.js')(router, passport); // load our routes and pass in our app and fully configured passport

////

app.use(function(req,res,next) {
  if (req.isAuthenticated()) {
    if (req.user.username) {
      req.username=req.user.username;
      req.userid=req.user._id;
      req.perm=req.user.perm;
      return next();
    } else {
      if (req.url != "/Username") res.redirect("/Username");
      else return next();
    }
  } else {
    return next();
  }
});

function useRoute(id,url) {
  if (!url) url=id;
  app.use('/'+url,require('./routes/'+id));
}

useRoute("");
app.use("/Login",router);
useRoute("users","User");

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  /*res.status(404);
  basicRender(req,res,"404","404");*/
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//404
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
