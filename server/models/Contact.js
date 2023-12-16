const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
     firstName:String,
     lastName:String,
     email:String,
     mobile:String,
     city:String,
     state:String,
     country:String
  })
const Contact = mongoose.model("Contact", ContactSchema);
module.exports =  Contact;