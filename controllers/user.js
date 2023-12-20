const User = require("../models/user");
const { copmpareIt } = require("../services/compareIt");
const { getToken } = require("../services/getToken");
const { handleErrors } = require("../services/handleErrors");
const { hashIt } = require("../services/hashIt");
const { sendCookie } = require("../services/sendCookie");
module.exports.user_signout = (req, res) => {
  sendCookie(res, "", 1);
  res.json({ status: "You now signed Out!" });
};
module.exports.user_all = (req, res) => {
  res.json({ data: [] });
};
module.exports.user_signup = async (req, res) => {
  let users = await User.find();
  let role = "normal";
  if (users.length === 0) {
    role = "Admin";
  }
  let { email, password, gender, firstName, lastName } = req.body;
  let toUpd = { email, password, gender, firstName, lastName };
  let token = await getToken({ email, role, firstName, lastName });
  toUpd.role = role; // added role to here
  toUpd.token = token; // added token here
  let db = new User(toUpd);
  // res.json(toUpd);
  db.save()
    .then(async (rep) => {
      // sendCookie(res, token, 1000 * 60 * 15);
      res.json({ status: true, data: { token, firstName, lastName, role } });
    })
    .catch((err) => {
      // console.log(err.message);
      res.json(handleErrors(err));
    });
};
module.exports.user_signin = (req, res) => {
  let { email, password } = req.body;
  // use email to check if the user exist
  console.log(email, password);
  User.findOne({ email: email })
    .then(async (rep1) => {
      // if email exist, check if the typed password matches the one in db
      let isPasswordCorrect = await copmpareIt(password, rep1.password);

      if (isPasswordCorrect) {
        let token = await getToken({
          email: rep1.email,
          role: rep1.role,
          firstName: rep1.firstName,
          lastName: rep1.lastName,
        });
        // sendCookie(res, token, 1000 * 60 * 5);
        User.findOneAndUpdate(
          { email: email },
          { $set: { token: token } },
          { returnDocument: "after" }
        )
          .then((reply) => {
            res.json({
              status: true,
              data: {
                token,
                firstName: reply.firstName,
                lastName: reply.lastName,
                role: reply.role,
              },
            });
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.json({ err: "wrong email or password1" });
      }
    })
    .catch((err) => {
      res.json({ err: "wrong email or password2" });
    });
  // if true allow else throw and errow
};
module.exports.user_delete = (req, res) => {
  res.json({ data: {} });
};
module.exports.user_patch = (req, res) => {
  res.json({ data: {} });
};
