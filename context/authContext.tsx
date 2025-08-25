import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { login, register } from "@/services/authServices";

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
 

  const loadToken = async ()=>{
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded:{user:UserProps,exp:number} = jwtDecode<DecodedTokenProps>(storedToken);
        if (decoded.exp && decoded.exp  < Date.now() /1000 ) {
          await AsyncStorage.removeItem("token");
          return
        }
        settoken(storedToken)
        setuser(decoded.user)
      } catch (error) {
        goToWelcomePage();
        console.log("failed to decode token")
      }
    }
  }

  const goToHomePage = () =>{
    
  }
  const goToWelcomePage = () =>{

  }



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

  const signUp = async({email,password,name,avatar}:{email:string,password:string,name:string,avatar?:string})=>{
    
    const response = await register({email, password, name, avatar})
    if(response.token){
      await updateToken(response.token)
      router.replace("/(main)/home")
    } 
  }


  const signOut =async ()=>{
    setuser(null)
    settoken(null)
    await AsyncStorage.removeItem("token");
    router.replace("/(auth)/welcome")
  }
  
  return (
    <authContext.Provider value={{token,user,signIn,signUp,signOut,updateToken}}>
      {children}
    </authContext.Provider>
  )
}


export const useAuth = ()=> useContext(authContext)
