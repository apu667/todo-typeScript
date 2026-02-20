import express, { Request, Response } from "express";
import todoRoutes from "./routes/todoRoutes";
import dotenv from "dotenv";
import { connectDb } from "./db/databaseConnection";
import cors from "cors";
dotenv.config();
connectDb();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});