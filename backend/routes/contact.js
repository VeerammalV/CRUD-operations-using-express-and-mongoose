//crud

//create
const express=require('express');
const router = express.Router();
const contact = require("../models/contact");

router.post("/contact", async (req,res)=>{
    try{
        const newContact = new contact(req.body);
        await newContact.save()
        .then((savedContact) => {
            console.log(savedContact);
            res.status(201).json({msg:"contact saved"})
        })
        .catch((error)=>{
            console.log(error);

            if(error.code ===11000 && error.keyPattern && error.Pattern.emailAddress){
                res.status(500).json({msg:"email is already in use"})

            } else{
                res.status(500).json({msg:"unable to create contact"})
             }

        })
        

    }catch(error){
        console.log(error);
        res.status(500).json({msg: "unable to save the contact"})
    }
})


//read
router.get('/contact',async(req,res)=>{
    try{
        contact.find()
        .then((contacts)=>{
            console.log(contacts);
            res.status(200).json({Contacts: contacts});
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({msg:"unable to get contacts"})
        })
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"unable to get contact"})
    }
})


//read functionality using id

router.get('/contact/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        contact.findById(id)
        .then((contact)=>{
            console.log(contact)
            res.status(200).json({Contacts: contact});
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({msg:'unable to find the conatact'})
        })
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"unable to find the contact"})
    }
})

//search functionality

router.get('/search' , async(req,res)=>{
    try{
        const searchTerm = req.query.searchTerm;

        const searchRegex = new RegExp(searchTerm, "i");

        await contact.find({
            $or: [
                {firstName: searchRegex},
                {lastName: searchRegex},
                {emailAddress: searchRegex}
            ]
        })
        .then((contacts)=>{
            if(contacts.length){
                res.status(200).json({Contacts: contacts});
            } else{
                res.status(200).json({Contacts: [], msg:"no matching records found"});
            }
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({msg:'unable to find conatact'})
        })
    }catch(error){
        console.log(error);
        res.status(500).json({msg: 'no matching records found'})
    }
})


//update

router.put('/contact/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const updatedContact = req.body;
        await contact.findOneAndUpdate({_id: id}, updatedContact, {new:true})

        .then((updatedContact)=>{
            console.log(updatedContact);
            res.status(200).json({msg:'contact updated', contact: updatedContact})
        })
        .catch((updatedContact)=>{
            console.log(error);
            res.status(500).json({msg:'unable to update the contact'})
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({msg:'unable to update the contact'})
    }
});

//delete

router.delete('/contact/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        await contact.findByIdAndDelete(id)
        .then((deletedContact)=>{
            console.log(deletedContact);
            res.status(200).json({msg:'contact deleted', contact:deletedContact});
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({msg:'unable to delete contact'})
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({msg: 'unable to delete the contact'})
    }
})

module.exports=router;
