import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import BackButton from '@/components/BackButton'

export default function register() {
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios"? "padding":"height"} onTouchStart={Keyboard.dismiss}>

    <ScreenWrapper showPattern={true} bgOpacity={0.5}>
    <View  style={styles.container}> 
      
    <View style={styles.header}>
      <BackButton/>

    </View>
      </View>
    </ScreenWrapper>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  
  },
  header:{
    paddingHorizontal:spacingX._20,
    paddingTop:spacingY._15,
    paddingBottom:spacingY._25,
  },
  content:{
    flex: 1,
    backgroundColor:colors.white,
    borderTopLeftRadius:radius._50,
    borderTopRightRadius:radius._50,
    borderCurve:"continuous",
    paddingHorizontal:spacingX._20,
    paddingTop:spacingY._20,
  },
  form:{
    gap:spacingY._15,
    marginTop:spacingY._10,
  },
  footer:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    gap:5
  }
})