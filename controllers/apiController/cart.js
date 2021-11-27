const Cart = require("../../models/cart");
const OrderItem = require("../../models/orderItem");
const request = require("request");
const url= "http://localhost:3000/cart"

exports.postCart=(req, res, next)=>{
    const itemId = req.body.id;
    console.log(itemId);
    OrderItem.findOne({_id:itemId}).then(item=>{
        res.status(200).send(item)
    })
}