import mongoose from 'mongoose';



const PropertySchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    type:{type:String,required:true},
    price:{type:Number,required:true},   
    country:{type:String,required:true},
    state:{type:String,required:true},
    city:{type:String,required:true},
    location:{type:String,required:true},
    imageKey:{type:String,required:true},
    imageFile:{type:String,required:true},
    videoKey:{type:String,required:true},
    videoFile:{type:String,required:true},
    booked:{type:Boolean,default:false},
    creator:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
})


const propertyModel = mongoose.model('Property',PropertySchema);

export default propertyModel;