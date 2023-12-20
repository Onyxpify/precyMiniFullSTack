const { check, validationResult } = require("express-validator");

exports.validateBlog = [
  check("title").isString().withMessage("title must be a s string"),
  check("author").isString().withMessage("author must be a s string"),
  check("date").isString().withMessage("date must be a string"),
  check("content").isString().withMessage("content must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
