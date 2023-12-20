module.exports.home_get = (req, res) => {
  res.json({ page: "Home page" });

  // console.log(req.headers);
};
module.exports.home_post = (req, res) => {
  res.json({ page: "contented posted" });
};
module.exports.home_delete = (req, res) => {
  res.json({ page: "content deleted" });
};
module.exports.home_patch = (req, res) => {
  res.json({ page: "Home upated" });
};
