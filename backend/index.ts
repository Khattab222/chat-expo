import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import connectDB from "./config/db.js";
// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

 


app.get("/", (_req, res) => {
	res.json({ status: "ok", message: "Server is running" });
})
const server = http.createServer(app);


connectDB()
server.listen(PORT, () => {
	console.log(`Server listening nnnn on http://localhost:${PORT}`);
});

export default app;