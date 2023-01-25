const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();
const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // 미들웨어 정적파일 폴더 지정
app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  next();
});

app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
