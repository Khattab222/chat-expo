import { getSocket } from "./socket"

export const testSocket = (payload:any,off:boolean = false)=>{

  const socket = getSocket();
  if (!socket){
    console.log("socket is not connected")
    return;
  }
  if (off) {
    socket.off("test_event",payload);
  }else if(typeof payload === "function"){
    socket.on("testSocket",payload);
  }else{
    socket.emit("testSocket",payload);
  }
}
export const updateProfile = (payload:any,off:boolean = false)=>{

  const socket = getSocket();
  if (!socket){
    console.log("socket is not connected")
    return;
  }
  if (off) {
    socket.off("updateProfile",payload);
  }else if(typeof payload === "function"){
    socket.on("updateProfile",payload);
  }else{
    socket.emit("updateProfile",payload); //send payload as data
  }
}