import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

// Routes
import authRoutes from "./routes/authRoutes";
import readerRoutes from "./routes/readerRoutes";
import bookRoutes from "./routes/bookRoutes";
import lendingRoutes from "./routes/lendingRoutes";
import overdueRoutes from "./routes/overdueRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/readers", readerRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/lending", lendingRoutes);
app.use("/api/overdue", overdueRoutes);

app.get("/", (_, res) => res.send("BookClub API Running"));

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
