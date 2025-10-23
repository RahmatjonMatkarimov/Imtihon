const mongoose = require("mongoose")

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("connect to db"))
            .catch((err) => console.log(err))
    } catch (error) {
        console.error(error)
    }
}

