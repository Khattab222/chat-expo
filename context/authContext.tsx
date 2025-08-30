import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { login, register } from "@/services/authServices";
import { connectSocket, disconnectSocket } from "@/socket/socket";

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
 
useEffect(() => {
  loadToken()
}, [])

  const loadToken = async ()=>{
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedTokenProps>(storedToken);
        if (decoded.exp && decoded.exp  < Date.now() /1000 ) {
          await AsyncStorage.removeItem("token");
          return
        }
        settoken(storedToken)
        setuser(decoded)
        console.log("ok")
      await connectSocket()

        goToHomePage()
      } catch (error) {
        goToWelcomePage();
        console.log("failed to decode token")
      }
    }else{
      goToWelcomePage();
      console.log("noooo")
    }
  }

  const goToHomePage = () =>{
    setTimeout(() => { router.replace("/(main)/home") }, 1000)
  }
  const goToWelcomePage = () =>{
    setTimeout(() => { router.replace("/(auth)/welcome") }, 1000)
  }



   const updateToken = async (newToken:string)=>{
    if(newToken){
      settoken(newToken)
      await AsyncStorage.setItem("token",newToken)
              const decodedToken = jwtDecode<DecodedTokenProps>(newToken);

      setuser(decodedToken)
    }
   }
  const signIn = async (email:string,password:string)=>{

    const response = await login(email,password)
    if(response.token){
      await updateToken(response.token)
      await connectSocket()
      router.replace("/(main)/home")
    }
  }

  const signUp = async({email,password,name,avatar}:{email:string,password:string,name:string,avatar?:string})=>{
    
    const response = await register({email, password, name, avatar})
    if(response.token){
      await updateToken(response.token)
      await connectSocket()

      router.replace("/(main)/home")
    } 
  }


  const signOut =async ()=>{
    setuser(null)
    settoken(null)
    await AsyncStorage.removeItem("token");
    await disconnectSocket()
    router.replace("/(auth)/welcome")
  }
  
  return (
    <authContext.Provider value={{token,user,signIn,signUp,signOut,updateToken}}>
      {children}
    </authContext.Provider>
  )
}


export const useAuth = ()=> useContext(authContext)
