var c=new global.config("auth",{
  "f-id":"0000",
  "f-sec":"0000",
  "t-key":"0000",
  "t-sec":"0000",
  "g-id":"0000",
  "g-sec":"0000"
});
module.exports = {

    'facebookAuth' : {
        'clientID'        : c.g("f-id"), // your App ID
        'clientSecret'    : c.g("f-sec"), // your App Secret
        'callbackURL'     : global.c.s("external")+'Login/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : c.g("t-key"),
        'consumerSecret'     : c.g("t-sec"),
        'callbackURL'        : global.c.s("external")+'Login/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : c.g("g-id"),
        'clientSecret'     : c.g("g-sec"),
        'callbackURL'      : global.c.s("external")+'Login/auth/google/callback'
    }

};
