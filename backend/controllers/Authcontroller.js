const Errorhandler = require("../middleware/Error.js");
const User = require("../models/Usermodel.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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

const signin =  async(req,res,next) => {
    const {email, password} = req.body
    try{
        const validUser = await User.findOne(email)
        if(!validUser){
            return next(Errorhandler(404,"User not found."))
        }
        const validPassword = bcrypt.compareSync(password, validUser.password)
        if(!validPassword){
            return next(Errorhandler(404,"Wrong credentials."))
        }
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
        res.cookie("accessToken", token, {httpOnly:true}).status(200)
        .json(validUser);
        
    }
    catch(error){
        next(error)
    }
};

module.exports = signup, signin;