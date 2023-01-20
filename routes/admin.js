const express = require('express');

const router = express.Router();

router.get('/add-production', (req, res, next) => {
  // console.log('In another Middleware!');
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">add product</button></form>'
  );
});

router.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
