const Errorhandler = require("../middleware/Error.js");
const bcrypt = require("bcrypt");
const User = require("../models/Usermodel.js");

const test = (req,res)=>{
    res.send("This is a user route and controller")
};

const updateUser = async (req,res,next) =>{
    if (req.user.id !== req.params.id){
        return next(Errorhandler(401, "You should only update your own account"))
    }
    try{
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
        }catch(error){
        next(error)
    }
}

module.exports = {test, updateUser};

