const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const { MONGODB_URL_offline, MONGODB_URL_online } = process.env;

async function startDb(cb) {
  let db = await mongoose.connect(`${MONGODB_URL_offline}`);
  if (db.STATES.connected === 1) {
    console.log("Connection to Db was successfull!");
    cb();
  } else {
    console.log(
      "unable to connect to db. please check internet,login details or connection string"
    );
  }
}

module.exports = startDb;
