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

module.exports = Product;
