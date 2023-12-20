const mongoose = require("mongoose");
const { hashIt } = require("../services/hashIt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "please provide an email"],
      unique: [true, "A user with this email already exist"],
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
    },
    firstName: {
      type: String,
      required: [true, "please provide your first name"],
    },
    lastName: {
      type: String,
      required: [true, "please provide your last name"],
    },
    gender: {
      type: String,
      required: [true, "please provide your gender"],
    },
    role: {
      type: String,
      required: false,
      default: "normal",
    },
    token: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  this.password = await hashIt(this.password);
});

const User = mongoose.model("User10", userSchema);

module.exports = User;
