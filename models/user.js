const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;
class User {
  constructor({ username, email, cart, id }) {
    this.name = username;
    this.email = email;
    this.cart = cart; // ex) {items: []}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    // console.log('@@@@@@@@@@@', this.cart);
    // const updatedCart = {items: [{ productId: new ObjectId(product._id), quantity: 1 }]}
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1; // 기존 cart.items에 있는 Index로가서 +1한 수량을 newQuantity에 넣어줌
      updatedCartItems[cartProductIndex].quantity = newQuantity;// 업데이트할 객체 index에 해당 newQuantity넣어줌
    } else { // 같은것이 없다면 새로운 카트 제품이니 업데이트객체에 push하여 수량 1개짜리 넣어줌
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb(); // getDb로 디비 가져와서 users를 찾고 위에 있는정보를 업데이트해준다.
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log('findById: ', user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
