import mongoose from 'mongoose';
import Property from '../mongodb/models/property.js';
import User from '../mongodb/models/user.js';
import Payment from '../mongodb/models/payment.js';


import * as dotenv from 'dotenv';


import Razorpay from "razorpay";
import crypto from "crypto";


dotenv.config();



const checkout = async (req, res) => {
  try{
    const amount = req.body.amount;
    const pAmount = Number(amount * 100);


    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_SECRET,
    });



    const options = {
        amount: pAmount,
        currency: "INR",

    };
    const order = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        order
    });
  }
  catch(error)
  {
    res.status(500).json({
      message:error.message
    });
  }


}

const paymentVerification = async (req, res) => {

  const { id,email,agentid } = req.query;


    const {razorpay_order_id , razorpay_payment_id , razorpay_signature } = req.body;

    const body=razorpay_order_id + "|" + razorpay_payment_id;

    
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
          // Database comes here
        

          const propertyExists = await Property.findOne({ _id: id });
          const user = await User.findOne({ email });
          const agent = await User.findById(agentid);

          const allowedEmail = agent.allowAccess.find(obj => (obj.email === email && obj.property_id === id));
         

          if(allowedEmail == undefined)
          {
            agent.allowAccess.push({propertyname:propertyExists.name,property_id:id,fullname:user.name,email:email,status:"Pending",payment:false});
          
          }
          
        





          if(propertyExists)
          {
            propertyExists.booked = true;
            await propertyExists.save();

           
            const allowedEmailf = agent.allowAccess.find(obj => (obj.email === email && obj.property_id === id));
                 
            allowedEmailf.payment = true;
            await agent.save();
             
      
          await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            property:id,
            creator: user._id

          });

        }
          
       


      

        res.redirect(`http://localhost:3000/allproperties`);

        } else {

          // res.redirect(`http://localhost:3000/allproperties`);
         res.redirect(`http://localhost:3000/paymentfailed`);
        
      
    }
     
}

const getRazorKey = async (req, res) => {

    res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
}


export { checkout, paymentVerification, getRazorKey};


