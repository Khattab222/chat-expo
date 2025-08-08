import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import BackButton from '@/components/BackButton'
import Typo from '@/components/Typo'
import Input from '@/components/Input'

import * as Icon from "phosphor-react-native";
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import Button from '@/components/Button'
export default function register() {

const nameRef = useRef("")
const emailRef = useRef("")
const passwordRef = useRef("")
const [laoding, setLaoding] = useState(false)
  const router = useRouter()

const handleSubmit = ()=>{
  if(!nameRef.current || !emailRef.current || !passwordRef.current){
    Alert.alert("Sign Up","Please fill all fields")
    return
  }
}
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios"? "padding":"height"} onTouchStart={Keyboard.dismiss}>

    <ScreenWrapper showPattern={true} bgOpacity={0.5}>
    <View  style={styles.container}> 
      
    <View style={styles.header}>
      <BackButton iconSize={28}/>
      <Typo size={17} color={colors.white}>need some help?</Typo>

    </View>

    <View style={styles.content}>

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.form}
      keyboardShouldPersistTaps='handled'
    >
      <View style={{gap:spacingY._10,marginBottom:spacingY._15}}>
        <Typo size={25} fontWeight='bold'>Getting Started</Typo>
        <Typo color={colors.neutral600}>Create an account</Typo>
      </View>

    <Input 
    placeholder='Enter your name'
    onChangeText={(value:string)=>{nameRef.current = value}}
    icon={
      <Icon.UserIcon 
     size={verticalScale(26)}
      color={colors.neutral600}/>}
    />
    <Input 
    placeholder='Enter your Email'
    onChangeText={(value:string)=>{emailRef.current = value}}
    icon={
      <Icon.AtIcon
     size={verticalScale(26)}
      color={colors.neutral600}/>}
    />
    <Input 
    placeholder='Enter your Password'
    secureTextEntry={true}
    onChangeText={(value:string)=>{passwordRef.current = value}}
    icon={
      <Icon.LockIcon
     size={verticalScale(26)}
      color={colors.neutral600}/>}
    />
  
      <View style={{marginTop:spacingY._20, gap:spacingY._10}}>
        <Button loading={laoding} onPress={handleSubmit}>
          <Typo size={16} fontWeight='bold' color={colors.black}>Create Account</Typo>
        </Button>
        <View style={styles.footer}>
          <Typo>Already have account</Typo>
          <Pressable onPress={()=>router.push('/(auth)/Login')}>
          <Typo color={colors.primaryDark} fontWeight='bold'>Login</Typo>
          </Pressable>
        </View>
      </View>

    </ScrollView>


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
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
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