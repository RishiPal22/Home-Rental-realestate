const User = require("../models/Usermodel.js");
const bcrypt = require('bcrypt');

const signup = async(req,res,next)=>{

    try{
    const {username, email, password} = req.body;
    const hashedpassword = await bcrypt.hash(password, 11)
    const newUser = new User({username:username,email:email,password:hashedpassword})
    // const salt = bcrypt.gensalt(10)
    await newUser.save();
    console.log(hashedpassword)
    res.send(newUser)
    }
    catch(err){

        next(err)
    }
};

module.exports = signup;