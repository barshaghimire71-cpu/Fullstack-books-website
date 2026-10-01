import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Backend running → http://localhost:${PORT}`);
});
