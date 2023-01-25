const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor({ title, price, description, imageUrl, id }) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      //update the product
      dbOp = db
        .collection('products')
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this }); // update one product
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then((result) => {
        // console.log('result: ', result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // console.log(this);
  // console.log("save db here!", db)

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray() // mongodb 연결후 모든 데이터를 찾아서 가져옴, 가져온걸 JS Array로 교체
      .then((products) => {
        // console.log('products: ', products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) }) // 기존의 Bson 형태의 id를 가진 mongodb와 prodId 의 스트링을 비교하기위해서 prodId를 objectId로 전달
      .next()
      .then((product) => {
        // console.log('product: ', product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
