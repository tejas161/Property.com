import mongoose from 'mongoose';
import User from '../mongodb/models/user.js';
import Property from '../mongodb/models/property.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import path from 'path'
import sendEmail from '../middleware/email.js';
import readHTML from '../emails/readHTML.js';

import bcrypt from 'bcryptjs';


import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const createUser = async (req,res) => {
  
    const { name, email, phone, password, cpassword } = req.body;
    if (!name || !email || !phone  || !password || !cpassword) {
        return res.status(422).json({ message: "Please Fill all the Details" });
    }


    try{
        const userExist = await User.findOne({ email: email });

        if (userExist && userExist.verified == true) {
            return res.status(422).json({ message: "Email already exist" });
        }

        if(password!=cpassword)
        {
            return res.status(422).json({message:"Password does not matches confirm password"});
        }
        const otp = Math.floor(Math.random() * 900000) + 100000;
         const passwordHash = await bcrypt.hash(password,12);

        if(userExist && userExist.verified == false)
        {
              userExist.name=name;
              userExist.email=email;
              userExist.phone=phone;
              userExist.password= passwordHash;
              userExist.otp=otp;

              await userExist.save();
        }
        else{

        const user = new User({name, email, phone, password:passwordHash,otp});

        await user.save();
        }




        const first_name=name;
        const emails=email;
       

        await sendEmail({
            to: emails,
            subject: "One Time Password (Property.com)",
            html: await readHTML(
                path.join(__dirname, "../emails/verify-account.ejs"),
                { first_name, emails, token: otp }
            ),
        });
      

    



         res.status(200).json({message:"User registered successfully"});

    }catch(err){
        console.log(err);

    }
}



const userLogin = async (req,res) => {

    try{
        const{email,password} = req.body;
     
        if(!email || !password)
        {
            return res.status(400).json({message:"plz fill all data in login"});
        }

        const userLogin = await User.findOne({email:email});
        
        if(userLogin && userLogin.verified == true)
        {

            const isMatch = await bcrypt.compare(password ,userLogin.password);
          
            

         

            if(!isMatch)
            {
                res.status(400).json({message:"Invalid credentials"});
    
            }else{

              const token = await userLogin.generateAuthToken();
              
              

                res.cookie("jwtoken",token,{
                    expires:new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                    httpOnly:true

                });
               

             res.status(200).json({message:"user signin successfuly"});
            }
        }
            else{
                res.status(400).json({message:"Login Error"});
            }
         

        

      

    }catch(err){
        console.log(err);
    }

}


const userProfile = async (req,res) => {
 

    res.status(200).send(req.rootUser);

}

const reqContact = async (req,res) => {

    try{

        const {userName,userEmail,agentId,property_id} = req.body;
        const session = await mongoose.startSession();
        session.startTransaction();

        const agent = await User.findById(agentId).session(session);
        const propertyExists = await Property.findById(property_id);

        if(!agent)
        {
            throw new Error('Agent not found');
        }

        const allowedEmail = agent.allowAccess.find(obj => (obj.email === userEmail && obj.property_id === property_id));
        
     
        if(allowedEmail != undefined)
        {
            allowedEmail.status = "Pending";
           
            await agent.save();
        }     
       else{
        agent.allowAccess.push({propertyname:propertyExists.name,property_id:property_id,fullname:userName,email:userEmail,status:"Pending",payment:false});
        await agent.save();
         }


        await session.commitTransaction();
        session.endSession();

        res.status(200).json({message:'Requested for info successfully'});

    }
    catch(error)
    {
          res.status(500).json({message:error.message});

    }

}

const reqUpdate = async(req,res) => {

    try{

        const {userId,email,status,property_id} = req.body;
        const user = await User.findById(userId);
       
        const allowedEmail = user.allowAccess.find(obj => (obj.email === email && obj.property_id === property_id));
     
        allowedEmail.status = status;
           
         await user.save();

        res.status(200).json({message:'saved successfully'})


    }
    catch(error){
        res.status(500).json({message:error.message});
    }

}


const verifyOtp = async(req,res) => {

    const {email,num} = req.body;

    const otpreceived = num;
    



    const user = await User.findOne({email:email});
   

    if(user && user.otp == otpreceived)
    {
        user.verified=true;
        await user.save();
        res.status(200).json({message:"User Verified"});
    }
    else{
        res.status(500).json({message:"User not verified"});
    }




}

const resetPassword = async(req,res) => {

    const {uemail}=req.body;
   
    try{
    const user = await User.findOne({email:uemail});
    
    if(user && user.verified==true)
{

    const first_name=user.name;
    const emails=uemail;
    const user_id=user._id;

    await sendEmail({
        to: emails,
        subject: "Reset Password Link (Property.com)",
        html: await readHTML(
            path.join(__dirname, "../emails/reset-password.ejs"),
            { first_name, emails, user_id}
        ),
    });
     
}

    res.status(200).json({success:true});
}
catch(error)
{
    res.status(500).json({message:error.message});
}

}


const changePassword = async(req,res) => {

    const {userId,password}=req.body;
    try{

        const user = await User.findOne({_id:userId});

       const passwordHash = await bcrypt.hash(password,12);
        user.password=passwordHash;

       

        await user.save();

        res.status(200).json({message:'successful'});


    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
}

const userLogout = (req,res) => {
   
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('User Logout');

}

const updatePhone = async(req,res) => {
    const {newphone,useremail}=req.body;

    try{

        const user = await User.findOne({email:useremail});
        const update = { $set: { phone: newphone } };
        await user.updateOne(update);
      
        res.status(200).json({message:'success'})

    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
}


const profileImage = async(req,res) => {

    const { imageFile,useremail} = req.body;
    try{
        const user = await User.findOne({email:useremail});

         const photoUrl = await cloudinary.uploader.upload(imageFile);


         const update = { $set: { profileIcon: photoUrl.url } };
         await user.updateOne(update);

        


        res.status(200).json({message:'success'});
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
}

export {createUser , userLogin , userProfile ,reqContact,reqUpdate, userLogout ,verifyOtp,resetPassword,changePassword,updatePhone,profileImage};


