const mongoose =require('mongoose');

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
    },
    //this defines the objectid of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    //this defines the type of liked object whether its a comment or a post since this is a dynamice reference
    onModel:{
        type: String,
        required: true,
        enum: ['Post','Comment']
    }


},
{
    timestamps: true
})

const Like=mongoose.model('Like',likeSchema);
module.exports=Like;