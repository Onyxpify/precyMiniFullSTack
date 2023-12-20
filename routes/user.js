const express = require("express");
const {
  user_signin,
  user_signup,
  user_delete,
  user_patch,
  user_signout,
  user_all,
} = require("../controllers/user");
const { validateUser } = require("../validator/validateUser");
const user_route = express.Router();

user_route.get("/signout", user_signout);
user_route.get("/user", user_all);
user_route.post("/signin", user_signin);
user_route.post("/signup", validateUser, user_signup);
user_route.delete("/user", user_delete);
user_route.patch("/user", user_patch);

module.exports = user_route;
