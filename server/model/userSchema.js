const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cpassword:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages : [
        {
            name:{
                type:String,
                require:true
            },
            email:{
                type:String,
                require:true
            },
            phone:{
                type:Number,
                require:true
            },
            message: {
                type:String,
                require:true
            }
        }
    ],
    tokens:[
        {
            //as token generate many type so we use []
            token:{
                type:String,
                require:true
            }
        }
    ]

});


//we are hashing the password for encryption

userSchema.pre('save', async function(next) {
   if(this.isModified('password')){

    this.password = await bcrypt.hash(this.password,12);
    this.cpassword = await bcrypt.hash(this.cpassword,12);
   }

   next();
});

//we are generating token
userSchema.methods.generateAuthToken = async function(){
    try{
      let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({token:token});

      await this.save();
      return token;

    }catch (err){
       console.log(err);
    }
}

//store the message

userSchema.methods.addMessage= async function(name,email,message){
    try{
       this.messages = this.messages.concat({name,email,message});

       await this.save();
       return this.messages;
    }
    catch (error){
        console.log(error);
    }

}



const User = mongoose.model('USER', userSchema);

module.exports = User;
