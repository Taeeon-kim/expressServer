var express = require("express");
var app = express();

// get을 router라 부르고 하는일을 routing 이라 표현한다.
app.get("/", (req, res) => {
  res.send("Hello Home Page");
});
app.get("/login", (req, res) => {
  res.send("Login");
});
app.listen(3000, function () {
  console.log("Connected to 3000 port");
});
