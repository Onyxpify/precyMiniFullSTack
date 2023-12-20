const { forEach } = require("lodash");

module.exports.handleErrors = (err) => {
  let errors = {};
  if (err.code === 11000) {
    errors["email"] = "A user Exist with this email. Please try another one.";
  }
  if (err["name"] === "ValidationError") {
    console.log("ValidatorError");
    forEach(err["errors"], ({ properties }, val) => {
      //   console.log(key);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
