import { Platform } from "react-native";

// For iOS, make sure to replace this IP with your computer's local IP address
// const LOCAL_IP = "http://172.20.10.7:3000"; // Replace this with your computer's IP address
const LOCAL_IP = "http://192.168.1.8:3000"; // Replace this with your computer's IP address

export const API_URL = Platform.select({
    ios: LOCAL_IP,
    android: "http://10.0.2.2:3000",
    default: "http://localhost:3000"
}); 