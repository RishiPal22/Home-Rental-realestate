const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    email:{  
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        max: 50,
        required: true
    },
    avatar:{
        type: String,
        default: "https://img.freepik.com/free-vector/mysterious-mafia-man-wearing-hat_52683-34829.jpg?semt=ais_hybrid"
    }
}, {timestamps:true});

const User = mongoose.model("User", userSchema)
module.exports = User;