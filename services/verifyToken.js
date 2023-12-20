const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const { JWT_SECRET } = process.env;
module.exports.verifyToken = (token) =>
  new Promise(function (accept, reject) {
    jwt.verify(token, String(JWT_SECRET), (err, decoded) => {
      if (err) {
        reject(false);
      }
      accept(decoded);
    });
  });
