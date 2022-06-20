const passport=require('passport');
const JWTstrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;

const User=require('../models/users');

// making a key for encryption decryption
let opts ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JWTstrategy(opts, function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err)
        {
            console.log('error in finding the user');
        }
         if(user){
             return done(null,user);
         }
         else
         {
             return done(null,false);
         }
    })
}))


module.exports=passport;
