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
  const [isLayoutMounted, setIsLayoutMounted] = useState(false);
  const router = useRouter()
 
useEffect(() => {
  setIsLayoutMounted(true);
  loadToken()
}, [])

// Then modify your auth state useEffect
useEffect(() => {
  // Only navigate if the layout is mounted AND we have auth state
  if (!isLayoutMounted) return;
  
  if (token && user) {
    console.log("Navigating to home page");
    router.replace("/(main)/home");
  } else if (isLayoutMounted) {  // Only navigate to welcome if we're mounted
    console.log("Navigating to welcome page");
    router.replace("/(auth)/welcome");
  }
}, [token, user, isLayoutMounted]);

const loadToken = async () => {
  try {
    const storedToken = await AsyncStorage.getItem("token");
    console.log("Stored token:", storedToken ? "exists" : "none");
    
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedTokenProps>(storedToken);
        console.log("Token expiration:", decoded.exp, "Current time:", Date.now()/1000);
        
        if (decoded.exp && decoded.exp < Date.now()/1000) {
          console.log("Token expired");
          await AsyncStorage.removeItem("token");
          settoken(null);
          setuser(null);
        } else {
          console.log("Token valid, setting state");
          settoken(storedToken);
          setuser(decoded);
          goToHomePage();
          // await connectSocket();
        }
      } catch (error) {
        console.log("Failed to decode token:", error);
        await AsyncStorage.removeItem("token");
        settoken(null);
        setuser(null);
        goToWelcomePage()
      }
    } else {
      console.log("No token found");
      settoken(null);
      setuser(null);
        goToWelcomePage()

    }
  } catch (error) {
    console.log("Error loading token:", error);
    settoken(null);
    setuser(null);
        goToWelcomePage()

  }
};

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
