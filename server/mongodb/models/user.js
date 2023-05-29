import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    profileIcon:{type:String},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true},    
    token:{type:String , default:null},
    verified:{type:Boolean ,default:false},
    otp:{type:Number},
    allowAccess:{type: [{
      propertyname:{
        type:String
      },
      property_id:{
        type:String
      },
      fullname:{
        type:String,
      },
      email: {
        type: String,
       
      },
      status: {
        type: String,
       
      },
      payment:{
        type:Boolean,
        default:false
      }
    }],
    default: []},
    allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
    savedProperty : [{type:mongoose.Schema.Types.ObjectId, ref: "Property"}]

});


// Generating Json Web Token
UserSchema.methods.generateAuthToken = async function(){
      try{
      
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);

        this.token = token;
        await this.save();

        return token;



      }
       catch(err)
       {
           console.log(err);
       }

}

// UserSchema.pre('save',async function(next)
// {
//   if(this.isModified('password'))
//   {
//     this.password = await bcrypt.hash(this.password,12);
//   }


//   next();
// });




const userModel = mongoose.model('User',UserSchema);



export default userModel;

