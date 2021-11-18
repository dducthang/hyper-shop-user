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
  description: {
    color: String,
    sex: String,
    shoesHeight: String,
    closureType: String,
    material: String,
  },
  category: {
    type: String,
    required: true,
  },

  viewCount: {
    type: Number,
    default: 0,
  },
  image: String, // sau nay se dat la required
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

productSchema.methods.Description=function(){
  const des = this.description;
  return `Color of ${des.color}, has ${des.shoesHeight}, uses ${des.closureType}`;
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
