const User = require("../models/Usermodel.js");
const bcrypt = require('bcrypt');

const signup = async(req,res)=>{

    try{
    const {username, email, password} = req.body;
    const hashedpassword = await bcrypt.hash(password, 11)
    const saveuser = new User({username:username,email:email,password:hashedpassword})
    // const salt = bcrypt.gensalt(10)
    await saveuser.save();
    console.log("hi")
    console.log(hashedpassword)
    res.send(saveuser)
    }
    catch(err){
        res.send(err.message)
    }
};

module.exports = signup;