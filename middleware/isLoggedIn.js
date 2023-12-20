const { verifyToken } = require("../services/verifyToken");

exports.checkLogIn = async (req, res, next) => {
  let cookieHeader = req.headers;
  // console.log(cookieHeader);
  try {
    if (cookieHeader.jwt !== undefined) {
      // res.json({ status: 'pass' });
      let verifiedUser = await verifyToken(cookieHeader.jwt);
      if (verifiedUser.data.email) {
        next();
      } else {
        res.json({ err: "please login to continue" });
      }
    } else {
      res.json({ err: "please login to continue" });
    }
  } catch (error) {
    res.json({
      err: "faild to get cookie. please login to get it",
      Error: error,
    });
  }
};
