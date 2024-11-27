const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config() 
mongoose.connect(process.env.MONGOSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));

app.listen(3000,(req,res)=>{
    console.log('Server is running on port 3000')
});