const { Schema, model } = require("mongoose")

const schema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false,
        default: "user",
        enum: {
            values: ["user", "admin"]
        }
    },
    otp: {
        type: String,
        required: true,
    },
    otpTime: {
        type: Number,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: false,
        default: false
    },
},
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = model("auth", schema)