module.exports.sendCookie = (res, token, time) => {
  res.cookie("jwt", token, { maxAge: time });
};
