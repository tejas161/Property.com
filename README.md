<p align="center">
<img src="https://res.cloudinary.com/dzkfponvc/image/upload/v1685878066/favicon_a6sil6.png" height="100" width="100"/>
  </p>
<h1 align="center">Property.com</h1>
<h3 align="center">Property.com is an online Property Hosting and Viewing Web Application</h3>


 <p align="center">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" />  
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" />
  <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" />  
 </p>
 
 ----
<h3 align="center">Features</h3>

<div align="center">
  <p>⚡ CLean and Easy UI to interact for clients and Agents made with Material UI<br />
  🍪 Cookie-based authorization with JWT<br />
  👤 My Profile ,Dashboard and other fetures for clients and agents<br />
  🖼️ Images and videos of Property to be  uploaded with AWS-S3<br />
  💳 Payments using Razorpay for Property Booking<br />
  🌏 Google Maps for Better Property Viewing and knowing Precise Location<br />
   and a lot more..</p>
</div>


## Running Locally (2 Options)
<h4>1 . Run the Docker Compose file</h4>
<h4>2 . Run the Client  and Server separately on PORT 3000 and 3001</h4>


Following is the process for ##2

Clone this repository and install dependencies by running for both client and server:

```
npm install
#or
pnpm install
```

Create a new file named `.env` with the following environment variables in the server folder of the root project:

```
MONGODB_URL =
SECRET_KEY = 
CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET = 
HEADER_API_KEY = 

AWS_ACCESS_KEY = 
AWS_SECRET_KEY = 
AWS_REGION = 
AWS_BUCKET = 
AWS_API_VERSION = 

AWS_REGION_EMAIL = 
EMAIL_FROM = 

RAZORPAY_API_KEY=
RAZORPAY_API_SECRET=
```


For development mode, run:

```
npm run dev (client and server)
```

For production mode, run:

```

npm run build (client)
npm start (client and server)
```

Visit http://localhost:3000 or your custom port environment variable to view the app.

## Screenshots


![Banner Image](https://res.cloudinary.com/dzkfponvc/image/upload/v1685881267/WhatsApp_Image_2023-06-04_at_5.48.32_PM_cydstt.jpg)

|              Home Page               |            EMI Calculator            |
| :----------------------------------: | :----------------------------------: |
| ![](https://res.cloudinary.com/dzkfponvc/image/upload/v1685881631/WhatsApp_Image_2023-06-04_at_5.49.11_PM_djaiyl.jpg) | ![](https://res.cloudinary.com/dzkfponvc/image/upload/v1685881624/WhatsApp_Image_2023-06-04_at_5.49.10_PM_1_uzkn6b.jpg) |

|              Explore                 |               Property               |
| :----------------------------------: | :----------------------------------: |
| ![](https://res.cloudinary.com/dzkfponvc/image/upload/v1685881613/WhatsApp_Image_2023-06-04_at_5.49.10_PM_jhrwjb.jpg) | ![](https://res.cloudinary.com/dzkfponvc/image/upload/v1685881598/WhatsApp_Image_2023-06-04_at_5.49.09_PM_3_wlocs6.jpg) |

|          Property Location           |              Dashboard               |
| :----------------------------------: | :----------------------------------: |
| ![](https://res.cloudinary.com/dzkfponvc/image/upload/v1685881588/WhatsApp_Image_2023-06-04_at_5.49.09_PM_2_yb7szf.jpg) | ![](https://res.cloudinary.com/dzkfponvc/image/upload/v1685881570/WhatsApp_Image_2023-06-04_at_5.49.09_PM_1_gbh7rl.jpg) |

|            Services                  |       
| :----------------------------------: | 
| ![](https://res.cloudinary.com/dzkfponvc/image/upload/v1685881549/WhatsApp_Image_2023-06-04_at_5.49.09_PM_k0y5pb.jpg) | 









