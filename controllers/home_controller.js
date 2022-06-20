const Post=require('../models/post');
const User=require('../models/users');
module.exports.home=function(req,res){
    //return res.end('<h1>express is up for codial</h1>')

    // Post.find({},function(err,posts)
    // {
    //     return res.render('home',{
    //         title:"Home",
    //         posts: posts
    //     });
    // });
    //populate the user for each post so that we can display the user details
    Post.find({})
    .sort('-createdAt')
    .populate('user').
    populate({
        path:'comments',
        populate:
            {
                path:'user'
            }
    })
    .exec(function(err,posts){
        User.find({},function(err,users){
            return res.render('home',{
                title:"Home",
                posts: posts,
                all_users: users
        });
        });

        
})
}