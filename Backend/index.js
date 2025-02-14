import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/User.route.js";
import messageRoute from "./routes/Message.routes.js";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import {app , server} from "./socketIO/server.js"

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
}));



const PORT =process.env.PORT || 5001;

try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }


app.use("/user",userRoute);
app.use("/message",messageRoute);

if(process.env.NODE_ENV === 'production'){
  const dirPath = path.resolve();
  app.use(express.static("./Frontend/dist"));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(dirPath , './Frontend/dist','index.html'));
  });
}

server.listen (PORT , ()=>{
    console.log(`Server get started ${PORT}`)
})