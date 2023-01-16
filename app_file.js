var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();
app.locals.pretty = true;
app.set("views", "./views_file");
app.set("view engine", "jade");
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3000, () => {
  console.log("connected");
});
app.get(["/topic", "/topic/:id"], (req, res) => {
  fs.readdir("data", (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("internal server error");
    }
    var id = req.params.id;
    //id 값이 있을때
    if (id !== undefined) {
      fs.readFile(`data/${id}`, "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("internal server error");
        }
        res.render("view", { topics: files, title: id, description: data });
      });
    } else {
      res.render("view", {
        topics: files,
        title: "welcome",
        description: "hello, javascript for server",
      });
    }
  });
});

// app.get("/topic/:id", (req, res) => {
//   var id = req.params.id;

//   fs.readdir("data", (err, files) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("internal server error");
//     }
//     fs.readFile(`data/${id}`, "utf8", (err, data) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("internal server error");
//       }
//       res.render("view", { topics: files, title: id, description: data });
//     });
//     // res.render("view", { topics: files });
//   });
// });
app.get("/topic/new", (req, res) => {
  res.render("new");
});

app.post("/topic", (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile("data/" + title, description, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("internal server error");
    }
    res.send("Success");
  });
});
