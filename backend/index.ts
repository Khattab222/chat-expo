import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRouter.js";
import { globalResponse } from "./utils/errorHandling.js";
import { initializeSocket } from "./socket/socket.js";

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

app.use("/api/auth",authRoutes)


  app.all('*', (req, res, next) => {
        res.status(404).send("In-valid Routing Plz check url  or  method")
    })

     app.use(globalResponse)

const server = http.createServer(app);

initializeSocket(server)
connectDB()


  server.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});




export default app;