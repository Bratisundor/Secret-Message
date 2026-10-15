
const express = require("express");
const connectDB = require("./db");
connectDB();
const app = express();
const PORT = 3000;
const cors=require("cors");
require("dotenv");
app.use(cors())
app.get("/", (req, res) => {
    res.send("Colche");
    //res.sendFile("public/index.html");
});
const Message = require("./models/message");
app.use(express.json());
const rateLimit = require("express-rate-limit");

const messageLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 1,                         
  message: { error: "You already send a message" },
});
app.post("/message",async(req,res)=>{
    try{
        const newMessage = await Message.create({
           
                name: req.body.name,
                message: req.body.message,
                linkId:req.body.linkId
        });
        res.status(201).json(newMessage);
    }catch(error){
        res.status(400).json({error: error.message});
    }
});
app.get("/messages/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const messages = await Message.find({linkId:id}).sort({ createdAt: -1 });
    
    const result = messages.map((msg) => ({
      name: msg.name,
      message: msg.message,
      time: new Date(msg.createdAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
async function generate(){
    const randomstring=Math.random().toString(36).substring(2,9);
    if(await Message.find({linkId:randomstring})!=null){
         generate();
    }
   return randomstring;
}
app.get("/api/links",async (req,res)=>{
     const linkID=await generate();
     res.status(200).json({linkId: linkID});
})

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
