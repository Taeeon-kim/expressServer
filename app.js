const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const path = require('path');
const db = require('./util/database');
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');
db.execute('SELECT * FROM products')
  .then((result) => {
    console.log(result[0]);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // 미들웨어 정적파일 폴더 지정
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(3000);
