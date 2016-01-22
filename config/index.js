function config(name,d,ser) {
  if (!d) d={};
  if (!ser) ser={};
  var fs=require("fs");
  var path="./"+name+".config";
  var c;
  try {
    fs.accessSync(path);
    c=JSON.parse(fs.readFileSync(path).toString());
  } catch(e) {
    c={};
  }
  var def=d;
  for (var p in c) {
    d[p]=c[p];
  }
  c=d;

  function save() {
    fs.writeFile(path,JSON.stringify(c),function(err) {
      if (err) console.log("save","fail",path,err);
    });
  }

  save();

  function get(key) {
    return c[key];
  }

  function set(key,val) {
    c[key]=val;
    save();
  }

  var r={get:get,g:get,set:set,s:s};

  function s(key) {
    if (ser[key]) {
      return ser[key](get(key),r);
    } else {
      throw "Cannot ser "+key;
    }
  }

  return r;
}
module.exports=config;
