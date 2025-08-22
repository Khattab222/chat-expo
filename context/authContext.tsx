import { AuthContextProps, UserProps } from "@/types";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { login } from "@/services/authServices";

export const authContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateToken: async () => {},
})



export const AuthProvider = ({children}:{children:ReactNode})=>{

  const [token, settoken] = useState<string|null>(null)
  const [user, setuser] = useState<UserProps|null>(null)
  const router = useRouter()
 
   const updateToken = async (newToken:string)=>{
    if(newToken){
      settoken(newToken)
      await AsyncStorage.setItem("token",newToken)
      const decodedToken:{user:UserProps,exp:number} = jwtDecode(newToken)
      setuser(decodedToken.user)
    }
   }
  const signIn = async (email:string,password:string)=>{

    const response = await login(email,password)
    if(response.token){
      await updateToken(response.token)
      router.replace("/(main)/home")
    }
  }


  
  return (
    <authContext.Provider value={{token,user,signIn:async()=>{},signUp:async()=>{},signOut:async()=>{},updateToken:async()=>{}}}>
      {children}
    </authContext.Provider>
  )
}
