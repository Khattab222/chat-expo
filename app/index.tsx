
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { colors } from '@/constants/theme'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/authContext';
export default function SplachScreen() {
const router = useRouter()
const {token,user} = useAuth()
useEffect(() => {
  if (token && user) {
    // Use requestAnimationFrame to delay navigation until after render
    requestAnimationFrame(() => {
      router.replace("/(main)/home");
    });
  } else {
    requestAnimationFrame(() => {
      router.replace("/(auth)/welcome");
    });
  }
}, [token, user]);



  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
    {/* <StatusBar style="light" backgroundColor="black" /> */}
    
      <Animated.Image 
      source={require('@/assets/images/splashImage.png')}
      entering={FadeInDown.duration(500).springify()}
      style={styles.logo}
      resizeMode={'contain'}
      />

      
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.neutral900
    
  },
  logo:{
    height:"23%",
    aspectRatio:1,
  }
})