var fs=require("fs");
var ch=require("child_process");
var config=require("./config");
global.config=config;
c=new config("base",{
  port:3445,
  secret: 'thisisahostingdeb',
  external:"localhost", //change to external access url
  db : {
    host:"localhost",
    port:27017,
    auth:false, // {user,pw}
    db:"debian-repo"
  }
},{
  db:function(db) {
    var auth;
    if (!db.auth) {
      auth="";
    } else {
      auth=db.auth.name+":"+db.auth.pw+"@";
    }
    return "mongodb://"+auth+db.host+":"+db.port+"/"+db.db;
  },external:function(e,c) {
    return "http://"+e+"/";
  }
});
global.c=c;
console.log(c.s("db"));
var e=require("./express/bin/www");
var app=global.app=e.app;
var http=global.http=e.http;
