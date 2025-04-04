import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dotenv from "dotenv";
import authMiddleware from "./middleware/authMiddleware.js";
dotenv.config();
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/auth", userRoutes);
app.use("/user", authMiddleware, transactionRoutes);

app.listen(3000, () => {
  console.log("Server started on localhost 3000");
});
