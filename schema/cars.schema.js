const { Schema, model } = require("mongoose");

const carsSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    motor: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    gearbox: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    frontImage: {
        type: String,
        required: true
    },
    backImage: {
        type: String,
        required: true
    },
    modelImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = model("cars", carsSchema);