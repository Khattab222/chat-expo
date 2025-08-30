import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import { createServer } from "http";
import * as SocketIO from "socket.io";
import  { Socket,Server as SocketIOServer } from "socket.io";
import { registerUserEvents } from "./userEvents.js";

dotenv.config();
  export function initializeSocket(server:any): SocketIOServer {

    const io = new SocketIOServer(server, {
      cors: {
        origin: "*",
      }
    })


    io.use((socket:Socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error("Authentication error: Token is required"));
      }

      jwt.verify(token,process.env.TOKEN_SIGNATURE as string , (err:any,decoded:any)=>{
        if (err) {
          return next(new Error("Authentication error: Invalid token"));
        }

        // attach user data to socket 
        let userData = decoded;
        socket.data = userData
        socket.data.userId = userData.id
        next();
      })
    })

    // when socket connected
    io.on("connection",async (socket: Socket) => {
      const userId = socket.data.userId;
      console.log(`User connected: ${userId}, UserName: ${socket.data.name}`);
    
registerUserEvents(io,socket)

  // WHEN USER DISCONNECTED
    io.on("disconnect", (socket: Socket) => {
      const userId = socket.data.userId;
      console.log(`User disconnected: ${userId}, UserName: ${socket.data.name}`);
    });


    })

  



return io;
  }


