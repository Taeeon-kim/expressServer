const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // 미들웨어 정적파일 폴더 지정
app.use((req, res, next) => {
  User.findById('63d295cc79b138a17f73ffa5')
    .then((user) => {
      console.log(user)
      // console.log("app user: ",user)
      req.user = new User({
        username: user.name,
        email: user.email,
        cart: user.cart,
        id: user._id,
      });
      console.log("app request user: ",req.user)
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  // if()
  app.listen(3000);
});
