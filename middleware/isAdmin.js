const { verifyToken } = require("../services/verifyToken");

exports.adminOnly = async (req, res, next) => {
  let cookieHeader = req.headers;
  try {
    if (cookieHeader.jwt !== undefined) {
      // res.json({ status: 'pass' });
      let verifiedUser = await verifyToken(cookieHeader.jwt);
      // console.log(verifiedUser.data.role);
      if (verifiedUser.data.role === "Admin") {
        next();
      } else {
        res.json({ err: "only Admin can access this route" });
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
