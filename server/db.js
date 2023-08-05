const mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        mongoose.connect(process.env.MONGO_URL, connectionParams);
        console.log("Connect to Database Successfully")
    }
    catch (error) {
        console.log("Eroor connecting to database", error)
    }
}