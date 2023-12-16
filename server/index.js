const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors") ;
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Contact = require("./models/Contact");
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(bodyParser.json({limit:"100mb",extended:true}));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.post("/addContact",async(req,res) => {
    try {
  if(!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.mobile || !req.body.city || !req.body.state || !req.body.country)
    {
        return res.status(400).json({ msg:"All the fields are required",e});
    } 
  else {
    const contact = new Contact(req.body);
   await contact.save();
   return res.status(201).json({ msg:"Contact created successfully",contact});
  }
    }catch(e) {
        return res.status(500).json({ msg:"Opps! An error occured",e});
    }

})
app.get("/getContacts",async(req,res) => {
    try {
   const contacts = await Contact.find({});
   return res.status(201).json({ msg:"Contacts fetched successfully",contacts});
    }catch(e) {
        return res.status(500).json({ msg:"Opps! An error occured",e});
    }

})
app.put("/updateContact",async(req,res) => {
    try {
   const updatedContact =  await Contact.findByIdAndUpdate(req.body.id,req.body.formData,{new:true});
   return res.status(200).json({ msg:"Contacts fetched successfully",updatedContact});
    }catch(e) {
        return res.status(500).json({ msg:"Opps! An error occured",e});
    }

})
app.get("/searchContacts",async(req,res) => {
    try {
     const {query} = req.query;
     const regexPattern= new RegExp(query, "i")
     const result = await Contact.find({
      $or: [
        { name: { '$regex': regexPattern } }, 
        { mobile: { '$regex': regexPattern } },
        {email:{ '$regex': regexPattern }},
        {city:{ '$regex': regexPattern }},
        {state:{ '$regex': regexPattern }},
        {country:{ '$regex': regexPattern }},
      ]
    });
   return res.status(200).json({ msg:"Contacts fetched successfully",result});
    }catch(e) {
        return res.status(500).json({ msg:"Opps! An error occured",e});
    }

})
app.delete("/deleteContact/:id",async(req,res) => {
    try {
     const {id} = req.params;
     if(!id) {
        return res.status(400).json({ msg:"No id given to delete contact",e});
     }
    else {
        await Contact.findByIdAndDelete(id)
        return res.status(200).json({ msg:"Contacts deleted successfully"});
    }
   
    }catch(e) {
        return res.status(500).json({ msg:"Opps! An error occured",e});
    }

})
const PORT = 8000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
