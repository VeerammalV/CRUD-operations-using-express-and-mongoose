const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true, 
    },
    lastName:{
        type:String,
        required:true
    },
    emailAddress:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:false
    }
}) ;

module.exports = mongoose.model("contact", contactSchema);