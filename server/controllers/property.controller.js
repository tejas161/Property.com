import mongoose from 'mongoose';
import Property from '../mongodb/models/property.js';
import User from '../mongodb/models/user.js';
import Payment from '../mongodb/models/payment.js';


import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fetch from 'isomorphic-fetch';

import { nanoid } from "nanoid";


import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";


import Razorpay from "razorpay";
import crypto from "crypto";

// import  redisClient  from 'ioredis';





dotenv.config();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET

// });

const getAllProperties = async (req, res) => {

    const { _start, _end, _sort1, _order, country = "", state = "", city = "", type = "" } = req.query;
    // console.log(req.query)


    //    const _start=0;
    //    const _end=5;

    //    const type="";
    //    const title_like="";


    //     const _order=-1;   //1 or -1

    //     const _sort="price";



    const query = {};

    if (type !== "") {
        query.type = type;
    }

    if (country !== "") {
        query.country = country;
    }
    if (state !== "") {
        query.state = state;
    }
    if (city !== "") {
        query.city = city;
    }


    // if(title_like)
    // {
    //     query.name = { $regex: title_like, $options: "i" };
    // }



    try {

        const count = await Property.countDocuments(query);

        const properties = await Property.find(query)
            .limit(Number(_end))
            .skip(Number(_start))
            .collation({ locale: "en_US", numericOrdering: true })
            .sort({ [_sort1]: _order });


           
           

        res.header('x-total-count', count);
        res.header('Access-Control-Expose-Headers', 'x-total-count');



        res.status(200).json(properties);

    

    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }
};


const getPropertyDetail = async (req, res) => {
    try {
        const { id } = req.query;
        const propertyExists = await Property.findOne({ _id: id }).populate(
            "creator",
        );


        if (propertyExists) {
            res.status(200).json(propertyExists);
        } else {
            res.status(404).json({ message: "Property not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createProperty = async (req, res) => {

    try {

        const { name, description, type, price, country, state, city, location, imageFile, videoFile, email } = req.body;

        // start a session

        const session = await mongoose.startSession();
        session.startTransaction();
        const user = await User.findOne({ email }).session(session);

        if (!user) {
            throw new Error('User not Found');

        }

        // const photoUrl = await cloudinary.uploader.upload(imageFile);


        const client = new S3Client({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
            apiVersion: process.env.AWS_API_VERSION,
            region: process.env.AWS_REGION,
        });

        const base64Data = new Buffer.from(
            imageFile.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
        );

        const typeOfImage = imageFile.split(";")[0].split("/")[1];
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: `${nanoid()}${Date.now()}.${typeOfImage}`,
            Body: base64Data,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: `image/${typeOfImage}`,
        };
        const uploadImage = new PutObjectCommand(params);
        await client.send(uploadImage);

        const awsImageKey = params.Key;
        const awsImagelocation = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

        const base64VideoData = new Buffer.from(
            videoFile.replace(/^data:video\/\w+;base64,/, ""),
            "base64");


        const typeOfVideo = videoFile.split(";")[0].split("/")[1];
        const videoparams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `${nanoid()}${Date.now()}.${typeOfVideo}`,
            Body: base64VideoData,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: `video/${typeOfVideo}`,
        };
        const uploadVideo = new PutObjectCommand(videoparams);
        await client.send(uploadVideo);

        const awsVideoKey = videoparams.Key;
        const awsVideoLocation = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${videoparams.Key}`;




        const newProperty = await Property.create({
            name,
            description,
            type,
            price,
            country,
            state,
            city,
            location,
            imageKey: awsImageKey,
            imageFile: awsImagelocation,
            videoKey: awsVideoKey,
            videoFile: awsVideoLocation,
            creator: user._id
        });



        user.allProperties.push(newProperty._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: 'Property created successfully' });

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }















};


const saveProperty = async (req, res) => {

    try {
        const { email, propertyId } = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();
        const user = await User.findOne({ email }).session(session);

        if (!user) {
            throw new Error('User not Found');

        }


        user.savedProperty.push(propertyId);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: 'Property Saved successfully' });




    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }


}

const unsaveProperty = async (req, res) => {

    try {
        const { email, propertyId } = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();
        const user = await User.findOne({ email }).session(session);

        if (!user) {
            throw new Error('User not Found');

        }


        const array = user.savedProperty


        const index = array.indexOf(propertyId);
        if (index !== -1) {
            array.splice(index, 1);
        }

        user.savedProperty = array;


        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: 'Property UnSaved successfully' });




    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const savedProperties = async (req, res) => {

    try {

        const { savedArray } = req.body;


        const properties = await Property.find({ _id: { $in: savedArray } });
        res.status(200).json(properties);



    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteProperty = async (req, res) => {
    try {
        const { id } = req.query;

        const propertyToDelete = await Property.findById(id).populate("creator");

        if (!propertyToDelete) throw new Error("Property not found");


        const session = await mongoose.startSession();
        session.startTransaction();

        const client = new S3Client({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
            apiVersion: process.env.AWS_API_VERSION,
            region: process.env.AWS_REGION,
        });

        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: propertyToDelete.imageKey,
        };

        const videoparams = {
            Bucket: process.env.AWS_BUCKET,
            Key: propertyToDelete.videoKey,

        }
        const removeImage = new DeleteObjectCommand(params);
        const removeVideo = new DeleteObjectCommand(videoparams);

        await client.send(removeImage);
        await client.send(removeVideo);



        propertyToDelete.creator.allProperties.pull(propertyToDelete);
        await propertyToDelete.deleteOne();


        await propertyToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Property deleted successfully" });



    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

const PropertyTypes = async (req, res) => {
    try {
        const PropertyTypes = [
            { id: 1, value: "apartment", text: "Apartment" },
            { id: 2, value: "villa", text: "Villa" },
            { id: 3, value: "farmhouse", text: "Farmhouse" },
            { id: 4, value: "condos", text: "Condos" },
            { id: 5, value: "townhouse", text: "Townhouse" },
            { id: 6, value: "duplex", text: "Duplex" },
            { id: 7, value: "studio", text: "Studio" },
            { id: 8, value: "chalet", text: "Chalet" }];

        res.status(200).json(PropertyTypes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}











const countries = async (req, res) => {
//     const client = new redisClient();


// const DEFAULT_EXPIRATION = 3600;
   
   

   

    try {   
        
        // client.get("countries", async(error,countries) => {
        //     if(error){console.log(error.message)}

        //     if(countries != null)
        //     {
        //         return res.json(JSON.parse(countries));
        //     }
        //     else{


        const resp = await fetch('https://api.countrystatecity.in/v1/countries', {
            method: "GET",
            headers: {
                "X-CSCAPI-KEY": process.env.HEADER_API_KEY
            },
            redirect: 'follow'
        });
        const getCountries = await resp.json();
        const getCountriesreduce = getCountries.map(({ id, name, iso2 }) => ({ id, name, iso2 }));
        // client.setex("countries",DEFAULT_EXPIRATION,JSON.stringify(getCountriesreduce));
       
         res.status(200).json(getCountriesreduce);

            
     



     
    // }})
}
    catch (error) {
        res.status(500).json({ message: error.message });
    }

  
}

const states = async (req, res) => {

    try {
        const { countryiso } = req.body;
        const resp = await fetch(`https://api.countrystatecity.in/v1/countries/${countryiso}/states`, {
            method: "GET",
            headers: {
                "X-CSCAPI-KEY": process.env.HEADER_API_KEY
            },
            redirect: 'follow'
        });
        const getStates = await resp.json();
        const getStatesReduce = getStates.map(({ id, name, iso2 }) => ({ id, name, iso2 }));
        res.status(200).json(getStatesReduce);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const cities = async (req, res) => {

    try {

        const { countryiso, stateiso } = req.body;
        const resp = await fetch(`https://api.countrystatecity.in/v1/countries/${countryiso}/states/${stateiso}/cities`, {
            method: "GET",
            headers: {
                "X-CSCAPI-KEY": process.env.HEADER_API_KEY
            },
            redirect: 'follow'
        });
        const gcity = await resp.json();
        res.status(200).json(gcity);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }



}





export {
    getAllProperties, getPropertyDetail,
    createProperty, saveProperty, unsaveProperty, savedProperties, deleteProperty, PropertyTypes, countries, states, cities
};
