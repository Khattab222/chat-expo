import { API_URL } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";

let socket:Socket | null = null;

export async function connectSocket():Promise<Socket>{
  const token =await AsyncStorage.getItem("token");
  if(!token){
    throw new Error("No token found");
  }
  if (!socket) {
    socket = io(API_URL, {
      auth:{ token }
    })
  }

  // wait for connection
  await new Promise<void>((resolve,reject)=>{
    if(!socket) return reject(new Error("Socket not initialized"));
    socket.on("connect",()=>{
      console.log("Socket connected", socket?.id);
      resolve();
    })
    socket.on("connect_error",(err:any)=>{
      reject(err);
    } )

      socket.on("disconnect",()=>{
        console.log("Socket disconnected");
        socket = null;
      })


  })



return socket



}


export function getSocket():Socket | null{
  return socket;
}


export function disconnectSocket(){
  if(socket){
    socket.disconnect();
    socket = null;
  }
}
