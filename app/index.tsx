
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { colors } from '@/constants/theme'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
export default function SplachScreen() {
const router = useRouter()

useEffect(() => {
  
setTimeout(() => { 
  router.push('/(auth)/welcome')
 }, 1500)
}, [])



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