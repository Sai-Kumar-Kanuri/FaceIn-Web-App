import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path"

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// app.use("/api/auth", authRoutes);

app.use("/api/auth", authRoutes);

// app.get("/api/posts", postRoutes);
app.use("/api/posts", postRoutes);


app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend",dist,"index.html"));
})

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on PORT ${PORT}`);
})