const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();

const { SALT } = process.env;

module.exports.hashIt = (text) =>
  new Promise(function (accept, reject) {
    bcrypt.hash(text, Number(SALT), function (err, hash) {
      if (err) {
        reject(false);
      }
      accept(hash);
    });
  });
