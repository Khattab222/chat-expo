
import type { Request,NextFunction,Response } from "express"
import User from "../modals/User.js"
import { compareFunction } from "../utils/hashAndCompare.js";
import { generateToken } from "../utils/generateAndVerifyToken.js";



export const register = async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
    const {email,password,name,avatar}= req.body
    try {
        let userExist = await User.findOne({email});
  if (userExist) return res.status(400).json({success:false,message:"User already exists with this email"});

  const user = new User({email,password,name,avatar:avatar ||""});
  await user.save();
  return res.status(201).json({success :true ,message:"User registered successfully"});
    } catch (error) {
      console.log("error")
    }

}


export const login =  async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
   const {email,password} = req.body;
   try {
       let user = await User.findOne({email});
   if (!user) return res.status(400).json({success:false,message:"Invalid email or password"});

   const isMatch = compareFunction({payload:password,hashValue:user.password});
   if (!isMatch) return res.status(400).json({success:false,message:"Invalid email or password"});

   const token = generateToken({user});
   return res.status(200).json({success:true,message:"User logged in successfully",token});
   } catch (error) {
    console.log("sdsdsd")
   }

}

  


// export const getUserProfile = async (req:Request,res:Response,next:NextFunction):Promise<any>=>{

//     const userId = req.user.id;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({success:false,message:"User not found"});

//     return res.status(200).json({success:true,user});
// }



