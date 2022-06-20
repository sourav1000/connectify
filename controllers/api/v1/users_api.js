const User=require('../../../models/users');
const jwt=require('jsonwebtoken');


module.exports.createSession= async function(req,res){

    try{
        let user = await User.findOne({email: req.body.email})
        
        if(!user || req.body.password != user.password){
            return res.json(422,{
                message:"invalid username/password"
            })
        }

        return res.json(200,{
            message:"sign in successfull here is youer token please keep it",
            data:{
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '10000'})
            }
        })

    }catch(err){
        return res.json(500,{
            message:"internal server error"
        })
    }
}