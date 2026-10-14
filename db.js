const mongoose = require("mongoose");
const connectDB = async () => {
    try{
        await mongoose.connect(
        process.env.MONGO_URI || "mongodb://127.0.0.1:27017/secretmessage");
        console.log("MongoDB connected");
    }catch(error){
        console.log("MongoDB Connection failed : ",error.message);
        process.exit(1);
    }
};
module.exports = connectDB;