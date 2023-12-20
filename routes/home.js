const express = require("express");
const {
  home_get,
  home_post,
  home_delete,
  home_patch,
} = require("../controllers/home");
const home_route = express.Router();

home_route.get("/", home_get);
home_route.post("/", home_post);
home_route.delete("/", home_delete);
home_route.patch("/", home_patch);

module.exports = home_route;
