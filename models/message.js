const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    name:{
        type : String,
        default: "Anonymous",
        trim : true,
    },
    message:{
        type: String,
        required: true,
        trim : true,
    },
    linkId: { 
        type: String, 
        //unique:true, 
        required: true },
    createdAt:{
        type: Date,
        default : Date.now,
    },
});
module.exports = mongoose.model("Message",messageSchema);
