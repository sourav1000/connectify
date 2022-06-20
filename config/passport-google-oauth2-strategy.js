const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/users');


//need to tell passport to use google strategy

passport.use(new googleStrategy({
    clientID: "612813262409-covsfeq568pi5p52ho5spq97ngif32ko.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
//making the callback function the function which google sends us i guess
function(accessToken ,refreshToken,profile,done){
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("error in google strategy passport",err)
        }
        console.log(profile);
        if(user){
            //if found set this user as req.user
            done(null,user);
        }else{
            //if not found then create the user and set it as req.user(sign in that user)
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err)
                {
                    console.log('error in google strategy passport',err);
                    return ;
                }
                else{
                    return done(null,user);
                }
            })
        }
    })

}


))

module.exports=passport;