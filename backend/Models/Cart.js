const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items:[
        {
            foodId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        }
    ],
   
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Cart", cartSchema)