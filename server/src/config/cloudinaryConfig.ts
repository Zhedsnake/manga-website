import { config } from "dotenv";
config();

import { v2 as cloudinary } from 'cloudinary';


const CloudineryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const CloudineryApiKey = process.env.CLOUDINARY_API_KEY;
const CloudineryApiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: CloudineryCloudName,
  api_key: CloudineryApiKey,
  api_secret: CloudineryApiSecret,
  secure: true,
});

export default cloudinary;