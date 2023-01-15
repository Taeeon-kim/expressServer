var express = require("express");
var app = express();
app.locals.pretty = true;
app.set("view engine", "jade"); // 약속된 STRING view engine, jade engine으로 템플릿 사용 지정
app.set("views", "./views"); // 관습적으로 views 폴더를 사용 하지만 이름바꿔도됨
app.use(express.static("public"));
app.get("/template", (req, res) => {
  res.render("temp", { time: Date(), _title: "templae" });
});
// get을 router라 부르고 하는일을 routing 이라 표현한다.
app.get("/", (req, res) => {
  res.send("Hello Home Page");
});
app.get("/dynamic", (req, res) => {
  var lis = "";
  for (var i = 0; i < 5; i++) {
    lis = lis + "<li>coding</li>";
  }
  var time = Date();
  var output = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
      </head>
      <body>
        <h1>test!</h1>
        <ul>
        ${lis}
        </ul>
        ${time}
      </body>
    </html>`;
  res.send(output);
});
app.get("/route", (req, res) => {
  res.send("hello router, <img src='/choonsik.jpeg'>");
});
app.get("/login", (req, res) => {
  res.send("<h1>Login</h1>");
});
app.listen(3000, function () {
  console.log("Connected to 3000 port");
});