const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  color: String,
  sex: String,
  shoesHeight: String,
  closureType: String,
  material: String,
  category: {
    type: String,
    required: true,
  },

  viewCount: {
    type: Number,
    default: 0,
  },
  //ảnh chính
  image: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
  countInStock: {
    type: [
      {
        size: Number,
        quantity: Number,
      },
    ],
    required: true,
  },
});

productSchema.methods.Description = function () {
  return `Color of ${this.color}, has ${this.shoesHeight}, uses ${this.closureType}`;
};

const Product = mongoose.model('Product', productSchema);

function countProducts(filters) {
  return Product.find(filters).countDocuments();
}
function getProducts(filters) {
  return Product.find(filters);
}
function getProduct(id) {
  return Product.findById(id);
}
async function getCategoriesQuantity() {
  let catsQty = [];
  let cats = [];
  let sum = 0;
  cats = await Product.distinct('category');
  for (c of cats) {
    const quantity = await Product.count({ category: c });
    sum += quantity;
    catsQty.push({
      name: c,
      quantity,
    });
  }
  return { catsQty, sum };
}
function test(prop) {
  Product.distinct(prop).then(function (p) {
    console.log(p);
  });
}
module.exports = {
  countProducts,
  getProducts,
  getProduct,
  getCategoriesQuantity,
  test, //để query xem tung thuộc tính trên db có giá trị nào
};
