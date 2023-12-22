const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
// const cookieParser = require('cookie-parser');


//to check whether the user register with same email or already present

require('../db/conn');
const User = require('../model/userSchema');


//data read krney ke liye get use hoga
router.get('/', (req,res) => {
    res.send('Helloo world from the server router js');
});

//data lene keliye post use krenge - promises
// router.post('/register', (req,res) => {
//     const {name, email, phone, work, password, cpassword} = req.body;
    
//     if(!name|| !email|| !phone|| !work ||!password|| !cpassword){
//         return res.status(422).json({error: "Please filled the blank field"});
//     }

//     User.findOne({email:email}) //agr email match krgaya 
//     .then((userExist) => {
//         if(userExist){
//             return res.status(422).json({error: "email already exist"});
//         }

//             const user = new User({name, email, phone, work, password, cpassword})
//             //we can also write name:name , email:email etc..

//             user.save().then(()=>{
//                 res.status(201).json({message: "user registered successfully"})
//             }).catch((err)=>{
//                 res.status(500).json({error:"Failed to register"});
//             })
//     })
//     .catch((err)=> {
//         console.log(err);
//     })
// })

//asyn and await - REGISTER
router.post('/register', async (req,res) => {
    const {name, email, password, cpassword} = req.body;
    
    if(!name|| !email|| !password|| !cpassword){
        return res.status(422).json({ error: "Missing required fields", status: 422 });
    }

    try{
        
      const userExist = await User.findOne({email:email});

      if(userExist){
        return res.status(422).json({ error: "email already exist", status: 422 });

       }
       else if(password != cpassword){
        return res.status(422).json({error: "password are not matching", status:422});
       }
       else{
        const user = new User({name, email, password, cpassword});

        //password hashing before save
  
         await user.save();
  
         res.status(201).json({message: "user registered      successfully"});
  
       }  
    }
    catch (err){
       console.log(err);
    }
});


//For LOGIN
router.post('/login', async(req,res) => {

    const {email,password} = req.body;
    if(!email || !password){
        // return res.status(400).json({error: "Please filled the blank field"});
        return res.send({status:400})
    }
    try{
        let token;
        const userLogin = await User.findOne({email:email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            
            token = await userLogin.generateAuthToken();
            console.log(token);
    
        
            //to store token into cookie
            res.cookie("jwtoken", token, {
               expires:new Date(Date.now() + 25892000000),
               httpOnly:true
            });

            if(!isMatch){
                return res.send({status:400})
             }
             else{
                res.status(201).json({message: "successfully login"});
             }  
        }
        else{
            return res.status(400).json({error: "Register new email Id"});
        }

        
    }
    catch (err){
        console.log(err);
    }
});


//About ka page
router.get('/about', authenticate, (req,res) => {
    console.log('Hello my About');
    res.send(req.rootUser)
})

//Get data for contactuse page
router.get('/getData', authenticate, (req,res) => {
    console.log('Hello my Contact');
    res.send(req.rootUser)
})

//contact us ka page
router.post('/contact', authenticate , async (req,res) => {
    try{
      const {name,email,message} = req.body;

      if(!name || !email || !message) {
        return res.json({error:"Please fill the contact form"});
      }

      const userContact = await User.findOne({_id:req.userID});

      if(userContact){
        const userMessage = await userContact.addMessage(name,email,message);

        await userContact.save();
        res.status(201).json({message:"user contact successfully"})
      }
    }
    catch (err){
        console.log(err);
    }
});

//Logout ka page
router.get('/logout', (req,res) => {
    console.log('Hello my Logout');
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send(req.rootUser)
});



module.exports = router;