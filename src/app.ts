import express from "express"
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes";
import cors from "cors"

const app  = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({origin:'http://localhost:5173',}))


app.use("/api/auth",authRoutes);

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit();
  });
  
  export default app;