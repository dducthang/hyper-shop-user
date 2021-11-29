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

// exports.postCartAddProduct=(req, res, next)=>{
//     if(!req.session.cart){
//         req.session.cart=[{
//             id:req.body.id,
//             quantity: 1,
//         }]
//     }
//     else{
//         let checkExisted = false;
//         for (item of req.session.cart){
//             if(item.id===req.body.id){
//                 item.quantity+=1;
//                 checkExisted=true;
//                 break;
//             }
//         }
//         if(!checkExisted){
//             req.session.cart.push({
//                 id:req.body.id,
//                 quantity: 1
//             })
//         }
//     }
//     res.status(200).send('Add cart successfully');
// }