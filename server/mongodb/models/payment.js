import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({

    razorpay_order_id:{
        type:String,
        required:true
    },
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    },
    property:{type:mongoose.Schema.Types.ObjectId,ref:'Property',required:true},
    creator:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},

});


const paymentModel = mongoose.model('Payment',PaymentSchema);

export default paymentModel;


