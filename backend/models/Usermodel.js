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
        default: "https://pixabay.com/vectors/avatar-icon-placeholder-facebook-1577909/"
    }
}, {timestamps:true});

const User = mongoose.model("User", userSchema)
module.exports = User;