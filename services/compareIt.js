const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();

const { SALT } = process.env;

module.exports.copmpareIt = (text, hashed) =>
  new Promise(function (accept, reject) {
    bcrypt.compare(text, hashed, function (err, result) {
      if (err) {
        reject(false);
      }
      accept(true);
    });
  });
