
import  { Socket,Server as SocketIOServer } from "socket.io";
import User from "../modals/User.js";
import { generateToken } from "../utils/generateAndVerifyToken.js";

export function registerUserEvents(io: SocketIOServer, socket: Socket) {

  socket.on("testSocket",(data)=>{
    socket.emit("testSocket",{message:"hello from server"})
  })

socket.on("updateProfile",async(data:{name?:string,avatar?:string})=>{
  console.log("updateProfile event :",data);

  const userId = socket.data.userId;
  if (!userId) {
    return socket.emit("updateProfile",{success:false,msg:"unauthorized"})
  }

  try {
      const updatedUser =await User.findByIdAndUpdate(userId,{name:data.name,avatar:data.avatar},{new:true});
      if (!updatedUser) {
        return socket.emit("updateProfile",{success:false,msg:"user nor found"})
      }
      const newToken = generateToken({user:updatedUser});

      socket.emit("updateProfile",{
        success:true,
        data:{token:newToken},
        msg:"profile updated successfully"

      })
  } catch (error) {
    console.log("error updating");
    socket.emit("updateProfile",{success:false,msg:"error updating profile"})
  }



})


}