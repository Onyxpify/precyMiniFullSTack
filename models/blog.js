const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "please provide the blog title"],
    },
    author: {
      type: String,
      required: [true, "please provide the blog author"],
    },
    date: {
      type: String,
      required: [true, "please provide todays date"],
    },
    content: {
      type: String,
      required: [true, "please provide the blog content"],
    },
    blog_img_id: {
      type: String,
      required: [true, "please provide the blog image id"],
    },
    blog_img_url: {
      type: String,
      required: [true, "plase provide the blog image url"],
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog10", blogSchema);

module.exports = Blog;
