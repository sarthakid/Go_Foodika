
//1

// const express = require('express')
// const router = express.Router()
// const Order = require('../models/Orders')

// router.post('/myOrderData', async (req,res)=>{
//     let data = req.body.order_data
//     await data.splice(0,0, { order_date : req.body.order_date })

//     let eId = await Order.findOne ({ 'email' : req.body.email })
//     console.log(eId)
//     if(eId === null){

//         try{
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data]
//             }).then(()=>{
//                 res.json({ success: true })
//             })
//         }
//         catch (error){
//             console.error(error.message);
//             res.send("Server Error", error.message)

//         }
//     }
//     else{
//         try{
//             await Order.findOneAndUpdate({ 'email' : req.body.email }, 
//                 { $push: { order_data: data } }).then(()=>{
//                     res.json({ success: true })
//                 })
//         }
//         catch (error){
//             console.error(error.message);
//             res.send("Server Error", error.message)

//         }
//     }
// })

// module.exports = router;


















//2

const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        let { order_data, totalAmount, paymentMethod, transactionId, email, order_date } = req.body;

        // Add order details
        order_data.unshift({
            order_date,
            totalAmount,
            paymentMethod: paymentMethod || "Cash on Delivery",
            transactionId: transactionId || "N/A"
        });

        let existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            await Order.create({ email, order_data: [order_data] });
        } else {
            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data: order_data } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

// Fetch orders
router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ email: req.body.email });

        if (!myData) {
            return res.json({ orderData: [] }); // Empty array if no orders found
        }

        res.json({ orderData: myData.order_data.reverse() });
    } catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
});

module.exports = router;

































//3
// router.post('/orderData', async (req, res) => {
//     let data = req.body.order_data;
//     await data.splice(0, 0, { order_date: req.body.order_date });

//     let eId = await Order.findOne({ 'email': req.body.email });

//     if (eId === null) {
//         try {
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data],
//                 paymentDetails: {
//                     transactionId: req.body.paymentDetails.transactionId,
//                     paymentMethod: req.body.paymentDetails.paymentMethod,
//                     totalAmount: req.body.paymentDetails.totalAmount,
//                     orderTime: new Date()
//                 }
//             }).then(() => {
//                 res.json({ success: true });
//             });
//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send("Server Error", error.message);
//         }
//     } else {
//         try {
//             await Order.findOneAndUpdate(
//                 { 'email': req.body.email },
//                 {
//                     $push: { order_data: data },
//                     $set: { paymentDetails: req.body.paymentDetails }
//                 }
//             ).then(() => {
//                 res.json({ success: true });
//             });
//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send("Server Error", error.message);
//         }
//     }
// });




