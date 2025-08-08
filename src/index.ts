import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import readerRoutes from "./routes/readerRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/readers", readerRoutes);

app.get("/", (_, res) => res.send("BookClub API Running"));

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
