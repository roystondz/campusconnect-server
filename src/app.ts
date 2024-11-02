import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import prisma from "./config/db"
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import eventRoutes from "./routes/eventRoutes"
import dotenv from "dotenv"

const app = express();
app.use(cors());
dotenv.config();

app.use(bodyParser.json());
app.use('/auth',authRoutes);
app.use('/user',userRoutes);
app.use('/admin',eventRoutes);

app.get("/",(req,res)=>{
    console.log("Server is up");
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("SERVER IS RUNNING ON PORT");
} )

