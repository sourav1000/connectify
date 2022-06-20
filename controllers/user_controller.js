const User=require('../models/users');
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        res.render('profile',{
            title:"user profile",
            profile_user:user
        });
    })
    
}
module.exports.sign_in=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    res.render('user_sign_in',{
        title:"codial sign in"
    })
}

module.exports.sign_up=function(req,res){

    res.render('user_sign_up',{
        title:"codial sign up"
    })
}

module.exports.sign_out=function(req,res){
    req.session.destroy(() => {
        req.logout();
        res.redirect("/"); //Inside a callback… bulletproof!
       });
}

//updating profile details
module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     })
    User.findById(req.params.id,function(err,user){
        User.uploadedAvatar(req,res,function(er){
            if(er){
                console.log("**** Multer error:",er)
            }
            user.name=req.body.name;
            user.email=req.body.email;

            if(req.file){
                console.log(User.avatarPath)
                user.avatar=User.avatarPath + '/' + req.file.filename;

                user.save();
                return res.redirect('back');

            }
        })
    })
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password !=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email},function(err,user){
        if(err)
        {
            console.log("error in finding the user")
            return ;
        }
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log("error in finding the user")
                    return ;
                }
                return res.redirect('/users/sign-in')
            })
        }
        else
        return res.redirect('back');;
    })
}


//sign in and create the session
module.exports.createSession=function(req,res){
    return res.redirect('/')
}