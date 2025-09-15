import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import Button from '@/components/Button'
import { useAuth } from '@/context/authContext'
import { testSocket } from '@/socket/socketEvent'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import * as Icon from "phosphor-react-native";
import { Link, useRouter } from 'expo-router'

export default function home() {
  const router = useRouter()
  const {signOut,token,user} = useAuth()
  const handleLogout= async() => {
    await signOut()
  }

  useEffect(() => {

  testSocket(testSocketCallback)
  testSocket(null)
  return () => {
      testSocket(testSocketCallback,true)

  }
  
  }, [])
  
const testSocketCallback = (data:any) => {
  console.log("get response from testsocket event",data)
}
  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.4}>
      <View style={styles.container}>
      <View style={styles.header}>
      <View style={{flex:1}}>
        <Typo color={colors.neutral200} size={19} textProps={{numberOfLines:1}}>
           Welcome back ,  <Typo color={colors.white} fontWeight="800" size={20}>{user?.name}</Typo> 
        
           
           </Typo>
      </View>
      <TouchableOpacity style={styles.settingIcon} onPress={()=>{router.push("/modal/ProfileNodal")}}>
        <Icon.GearSixIcon color={colors.white} weight='fill' size={verticalScale(22)}/>
      </TouchableOpacity>
      </View>
      <View style={styles.content}>
        

      </View>
      </View>
      {/* <Typo color='white'>home</Typo>
      <Button onPress={handleLogout} >
        <Typo>LogOut</Typo>
      </Button> */}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  header:{
  
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:spacingX._20,
    gap:spacingX._15,
    paddingTop:spacingX._15,
    paddingBottom:spacingX._20,
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"space-between"
  },
  content:{
    flex:1,
    backgroundColor:colors.white,
    borderTopLeftRadius:radius._50,
    borderTopRightRadius:radius._50,
    borderCurve:'continuous',
    overflow:'hidden',
    paddingHorizontal:spacingX._20,

  },
  navBar:{
    flexDirection:"row",
    gap:spacingX._15,
    alignItems:"center",
    paddingHorizontal:spacingX._10
  },
  tabs:{
    flexDirection:"row",
    gap:spacingX._10,
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  tabStyle:{
    paddingVertical:spacingY._10,
    paddingHorizontal:spacingX._20,
    borderRadius:radius.full,
    backgroundColor:colors.neutral100
  },
  activeTabStyle:{
    backgroundColor:colors.primaryLight
  },
  conversationList:{
    paddingVertical:spacingY._20
  },

settingIcon:{
  padding:spacingY._10,
  backgroundColor:colors.neutral700,
  borderRadius:radius.full,
},


  floatingButton:{
    height:verticalScale(50),
    width:verticalScale(50),
    borderRadius:100,
    position:'absolute',
    bottom:verticalScale(30),
    right:verticalScale(30),
  }
})