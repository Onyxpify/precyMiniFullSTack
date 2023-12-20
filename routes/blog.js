const express = require("express");
const {
  blog_get,
  blog_post,
  blog_delete,
  blog_patch,
  blog_single,
} = require("../controllers/blog.js");
const { checkLogIn } = require("../middleware/isLoggedIn.js");
const { adminOnly } = require("../middleware/isAdmin.js");
const upload = require("../services/multer.js");
const { validateBlog } = require("../validator/validateBlog.js");
const blog_route = express.Router();

blog_route.get("/blog", checkLogIn, blog_get);
blog_route.post(
  "/blog",
  adminOnly,
  upload.single("img"),
  validateBlog,
  blog_post
);
blog_route.delete("/blog/:id", adminOnly, blog_delete);
blog_route.get("/single/:id", checkLogIn, blog_single);
blog_route.patch("/blog/:id", adminOnly, upload.single("img"), blog_patch);

module.exports = blog_route;
