const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("password")
    .isString()
    .withMessage("password must be a s string")
    .isStrongPassword()
    .withMessage(
      "Password must contain: Capital letter,number and special character"
    )
    .isLength({ min: 8 }),
  check("email")
    .isString()
    .withMessage("email must be a s string")
    .isEmail()
    .withMessage("Invalid email format: eg. example@gmail.com"),
  check("firstName")
    .isString()
    .withMessage("fisrtName must be a string")
    .isLength({ min: 2 })
    .withMessage("firstName can not be a character long"),
  check("lastName")
    .isString()
    .withMessage("lastName must be a string")
    .isLength({ min: 2 })
    .withMessage("lastName can not be a character long"),
  check("gender")
    .isString()
    .withMessage("gender must be a string")
    .isIn(["Male", "male", "Female", "female"])
    .withMessage("invalid gender type"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
