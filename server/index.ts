import express from "express";
import cors from "cors";
import { config } from "dotenv";
import authRouter from "./routers/authRouter";
import { connectDb } from "./configs/dbConfig";

config();
connectDb();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is ON Port: ${PORT}`));
