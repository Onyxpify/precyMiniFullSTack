const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config();

const { CLOUIDNARY_CLOUD_NAME, CLOUIDNARY_API_KEY, CLOUIDNARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUIDNARY_CLOUD_NAME,
  api_key: CLOUIDNARY_API_KEY,
  api_secret: CLOUIDNARY_API_SECRET,
  secure: true,
});

module.exports = { cloud: cloudinary };
