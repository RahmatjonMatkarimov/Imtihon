const { Schema, model } = require("mongoose")

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    },
},
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = model("Category", schema)