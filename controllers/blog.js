const { isValidObjectId } = require("mongoose");
const Blog = require("../models/blog");
const { cloud } = require("../services/cloudinary");

module.exports.blog_get = (req, res) => {
  Blog.find()
    .then((rep) => {
      res.json({ status: true, data: rep });
    })
    .catch((err) => {
      res.json(err);
    });
};
module.exports.blog_post = async (req, res) => {
  if (req.file) {
    //! algorithm to create a blog
    /* 
      > upload image to cloudinary
      > extract the public_id and Secure_url
      > add to the upload object
      > upload to db
      */
    try {
      // > upload image to cloudinary
      let result = await cloud.uploader.upload(req.file.path, {
        folder: "Cohort10",
      });

      // > extract the public_id and Secure_url
      let id = result.public_id;
      let url = result.secure_url;

      // > add to the upload object
      let { title, author, content, date } = req.body;
      let upd = {
        title,
        author,
        content,
        date,
        blog_img_id: id,
        blog_img_url: url,
      };

      // > upload to db
      let db = new Blog(upd);
      db.save()
        .then((rep) => {
          res.json({ status: true });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      res.json({ err: "unable to upload image to cloudinary" });
    }
  } else {
    res.json({ err: "this req has no file" });
  }
};
module.exports.blog_delete = async (req, res) => {
  /* 
    >get blog id
    > use id to get the exact blog from db
    > use image id in db to delete image from cloudinary
    > delete form db
  */

  let { id } = req.params;
  if (isValidObjectId(id)) {
    Blog.findById({ _id: id })
      .then(async (blog) => {
        cloud.uploader
          .destroy(blog.blog_img_id)
          .then((rem) => {
            Blog.findOneAndDelete({ _id: id })
              .then((rep) => {
                res.json({ status: true });
              })
              .catch((err) => {
                res.json({ err3: err });
              });
          })
          .catch((err) => {
            res.json({ err2: err });
          });
      })
      .catch((err) => {
        res.json({ err1: err });
      });
  } else {
    res.json({ err: "Please provide a valid blog id" });
  }
};
module.exports.blog_patch = (req, res) => {
  let { title, author, content, date } = req.body;
  let { id } = req.params;
  let upd = {};
  // console.log(title, author, content, date);
  if (title !== undefined) {
    // title field was sent
    upd.title = title;
  }
  if (author !== undefined) {
    // title field was sent
    upd.author = author;
  }
  if (content !== undefined) {
    // title field was sent
    upd.content = content;
  }
  if (date !== undefined) {
    // title field was sent
    upd.date = date;
  }
  if (req.file) {
    /* 
      > get the blog using the id
      > use blog img id to delete the old image from cloudinary
      > upload img to cloudinary
      > extract img id and url
      > update db

    */
    //   > get the blog using the id
    Blog.findById({ _id: id })
      .then((blog) => {
        // > use blog img id to delete the old image from cloudinary
        cloud.uploader
          .destroy(blog.blog_img_id)
          .then((rem) => {
            // > upload img to cloudinary
            cloud.uploader
              .upload(req.file.path, {
                folder: "Cohort10",
              })
              .then((cld) => {
                // > extract img id and url
                upd.blog_img_id = cld.public_id;
                upd.blog_img_url = cld.secure_url;
                // > update db
                Blog.findByIdAndUpdate(
                  { _id: id },
                  { $set: upd },
                  { returnDocument: "after" }
                )
                  .then((blg) => {
                    res.json({ status: true, data: blg });
                  })
                  .catch((err) => {
                    res.json(err);
                  });
              })
              .catch((err) => {
                res.json(err);
              });
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    if (isValidObjectId(id)) {
      Blog.findByIdAndUpdate(
        { _id: id },
        { $set: upd },
        { returnDocument: "after" }
      )
        .then((rep) => {
          res.json({ status: true, data: rep });
        })
        .catch((err) => {
          res.json(err);
        });
    } else {
      res.json({ err: "invalid blog id" });
    }
  }
};

module.exports.blog_single = (req, res) => {
  let { id } = req.params;
  Blog.findById({ _id: id })
    .then((rep) => {
      res.json({ status: true, data: rep });
    })
    .catch((err) => {
      res.json(err);
    });
};
