import { Document, model, Schema } from "mongoose";
import type { UserProps } from "../types.js";
import { hashFunction } from "../utils/hashAndCompare.js";



const UserSchema = new Schema<UserProps>({
  email: { type: String, required: true, unique: true,lowercase:true,trim:true },
  name: { type: String, required: true },
  avatar: { type: String, default: "" },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now },
  // Add other fields as needed
})


UserSchema.pre('save',function (next,doc) {
    this.password = hashFunction({payload:this.password});
    next();
})

export default model<UserProps>("User", UserSchema);