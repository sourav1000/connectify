const Like=require('../models/like');
const Comment=require('../models/comment');
const pPost=require('../models/post');
const Post = require('../models/post');
const res = require('express/lib/response');

module.exports.toggleLike= async function(req,res){
    try{
        // likes/toggle/?id=abcdef&type=POST
        let likeable;
        let deleted=false;
        if(req.query.type=='Post'){
            likeable =await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable= await Comment.findById(req.query.id).populate('likes');
        }


        //check if like already exists
        let exisitingLikes=Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user: req.user._id
        })
        if(exisitingLikes){
            likeable.likes.pull(exisitingLikes.id);
            likeable.save();

            exisitingLikes.remove();
            deleted=true;
        }
        else
        {
            let newlike=await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            likeable.likes.push(newlike._id);
        }
    }catch(err){
        console.log("like error",err);
        return ;
    }
    return res.redirect('back');
}
