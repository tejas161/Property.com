import express from 'express'
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './mongodb/connect.js';

import UserRouter from './routes/user.routes.js';
import PropertyRouter from './routes/property.routes.js';
import PaymentRouter from './routes/payment.routes.js';


import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


dotenv.config();

const app = express();
// app.use(cors({credentials: true, origin: true}));
app.use(cors({credentials: true, origin: true}));

app.use(cookieParser());
app.use(express.json({ limit: "80mb" }));
app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res) => {

    res.send({message:'hello world'});
})

// Add CORS headers middleware
// Add CORS headers middleware
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://54.172.121.49');
//     res.setHeader('Access-Control-Allow-Origin', 'http://ec2-54-172-121-49.compute-1.amazonaws.com');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });

// to redirect frontend
// app.use(express.static(path.join(__dirname, "/client/build")));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

app.use(UserRouter);
app.use(PropertyRouter);
app.use(PaymentRouter);


const startServer = async () => {
 
    try{
        //connect to the database
        connectDB(process.env.MONGODB_URL);

        app.listen(3001,() => console.log('Server is running on 3001'))


    }
    catch(error)
    {
        console.log(error);
    }
}


startServer();