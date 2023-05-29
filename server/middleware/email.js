import nodemailer from "nodemailer";
import aws from "@aws-sdk/client-ses";
import { defaultProvider } from "@aws-sdk/credential-provider-node";

import * as dotenv from 'dotenv';

dotenv.config();

const ses = new aws.SES({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    apiVersion: process.env.AWS_API_VERSION,
    region: process.env.AWS_REGION_EMAIL,
    defaultProvider,
});

const sendEmail = async (options) => {
    // create Nodemailer SES transporter
    let transporter = nodemailer.createTransport({
        SES: { ses, aws },
    });

  

    // send some mail
    await transporter.sendMail(
        {
            from: process.env.EMAIL_FROM,
            to: options.to,
            subject: options.subject,
            html: options.html,
            // text: options.text,
            // text: "I hope this message gets sent!",
            // ses: {
            //     // optional extra arguments for SendRawEmail
            //     Tags: [
            //         {
            //             Name: "tag_name",
            //             Value: "tag_value",
            //         },
            //     ],
            // },
        },
        (err, info) => {
            if (err) {
                console.error(`Error: ${err}`);
                // toast.error("Error");
                return;
            }
            // console.log(info.envelope);
            // console.log(info.messageId);
        }
    );
};

export default sendEmail;
