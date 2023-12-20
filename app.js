const express = require("express");
const home_route = require("./routes/home");
const blog_route = require("./routes/blog");
const startDb = require("./services/connectDb");
const user_route = require("./routes/user");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
var bodyParser = require("body-parser");
const path = require("path");

const { PORT } = process.env;
const origin = ["http://localhost:5173"];

// middleware
app.use(cors({ credentials: true, origin: origin })); // allow commuication with FE
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // allow form fields
app.use(bodyParser.json({ limit: "50mb" })); // allow json fields
app.use("/api_cohort10", [home_route, blog_route, user_route]);

//>>>>>>>> DEPLOYMENT >>>>>>>>>>>>>>>>>
app.use(express.static(path.join(__dirname, "/client/dist")));

//>>>>>>>>> SERVE REACT INDEX.HTML EACH TIME THERE IS A GET REQUEST >>>>>>>>>>>>>>

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist", "index.html"));
});

//routes
app.get("*", (req, res) => {
  res.json({ err: "Invalid route" });
});
app.post("*", (req, res) => {
  res.json({ err: "Invalid route" });
});
app.delete("*", (req, res) => {
  res.json({ err: "Invalid route" });
});
app.patch("*", (req, res) => {
  res.json({ err: "Invalid route" });
});

//start server
startDb(() => {
  app.listen(PORT || 5000, () => {
    console.log(`Listening to request on port ${PORT}`);
  });
});
