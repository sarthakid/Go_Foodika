// const mongoose = require('mongoose')

// const { Schema } = mongoose;

// const  OrderSchema  = new Schema({

//     email:{
//         type: String,
//         required: true,
//         unique: true
//     },

//     order_data:{
//         type: Array,
//         required:true,
//     },

// })

// module.exports = mongoose.model('order', OrderSchema)













const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email: String,
    order_data: Array,
    paymentDetails: {
        // transactionId: String,
        // paymentMethod: String,
        totalAmount: Number,
        orderTime: { type: Date, default: Date.now }
    }
});

module.exports = mongoose.model('Order', OrderSchema);
