const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
   
    DeliveryAddress: {
        type:Object,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
    totalAmount:{
        type:Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});
module.exports = mongoose.model("Order", orderSchema)