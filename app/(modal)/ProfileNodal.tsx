import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { scale, verticalScale } from '@/utils/styling'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import Avatar from '@/components/Avatar'
import * as Icon from "phosphor-react-native";
import Typo from '@/components/Typo'
import Input from '@/components/Input'
import { useAuth } from '@/context/authContext'
import { UserDataProps } from '@/types'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'
import { updateProfile } from '@/socket/socketEvent'


const ProfileNodal = () => {
  const router = useRouter()
  const {user,signOut,updateToken}=useAuth()
  const [loading, setloading] = useState(false)
  const [userData, setuserData] = useState<UserDataProps>({
    name:"",
    email:"",
    avatar:null
  })
  useEffect(() => {
      updateProfile(processUpdateProfile)

    return ()=>{
      updateProfile(processUpdateProfile,true)

    }
  }, [])
  const processUpdateProfile =(res:any)=>{
    console.log("got res:",res)
    setloading(false)
    if (res.success) {
updateToken(res.data.token)
      router.back()
    }else{
      Alert.alert("User",res.msg)
    }
  }
  useEffect(() => {
    setuserData({
      name:user?.name||"",
      email:user?.email||"",
      avatar:user?.avatar||null
    })
  }, [user])

  const handleLogout=async()=>{
    router.back();
    await signOut()
  }
  const showLogoutAlert = ()=>{
    Alert.alert("Confirm","Are You Sure To Logout",[
      {
        text:"Cancel",
        onPress:()=>console.log("cancel logout"),
        style:"cancel"
      },
      {
        text:"Logout",
        onPress:()=>handleLogout(),
        style:"destructive"
      },
    ])
  }
  
  const onSubmit = ()=>{
    const {name,avatar} = userData;
    if (!name.trim()) {
      Alert.alert("User","please enter your name")
      return;
    }else if (name.trim() ===user?.name.trim()){
        Alert.alert("User","same name")
      return;
    }
    // go
    const data ={
      name,avatar
    }
    setloading(true)
    updateProfile(data)
  }

  return (
    <ScreenWrapper style={{ justifyContent:"space-between",flex:1}} isModal={true}>
    <View style={styles.container}>
    <Header
     title='Update Profile'
     leftIcon={
      Platform.OS === "android"&& <BackButton color={colors.black}/>
     }
     style={{marginVertical:spacingY._15}}
     />
     {/* form */}
     <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>
     <View style={styles.avatarContainer}>
      <Avatar uri={null} size={160}/>
      <TouchableOpacity style={styles.editeIcon}>
      <Icon.PencilSimpleIcon
      size={verticalScale(20)}
      color={colors.neutral800}
      />
      </TouchableOpacity>
     </View>

     <View style={{gap:spacingY._20}}>
     <View style={styles.inputContainer}>
      <Typo style={{paddingLeft:spacingX._10}}>Email</Typo>
      <Input
      value={userData.email}
      containerStyle={{
        borderColor:colors.neutral350,
        paddingLeft:spacingX._20,
        backgroundColor:colors.neutral300
      }}
      editable={false}
      />
     </View>
     <View style={styles.inputContainer}>
      <Typo style={{paddingLeft:spacingX._10}}>Name</Typo>
      <Input
      value={userData.name}
      containerStyle={{
        borderColor:colors.neutral350,
        paddingLeft:spacingX._20,
        // backgroundColor:colors.neutral300
      }}
      onChangeText={(text)=>setuserData(prev=>({...prev,name:text}))}
      
      />
     </View>
     </View>
     </ScrollView>
      
    </View>
     <View style={styles.footer}>
      {
        !loading&&  <Button 
        onPress={showLogoutAlert}
    style={{
      backgroundColor:colors.rose,
      height:verticalScale(56),
      width:verticalScale(56),
    }}
    >
      <Icon.SignOutIcon
      size={verticalScale(24)}
      color={colors.white}
      weight="bold"
      />
    </Button>
      }
  
    <Button onPress={onSubmit} style={{flex:1}} loading={loading}>
    <Typo color={colors.black} fontWeight={"700"}>Update</Typo>
    </Button>
    </View>
  
    </ScreenWrapper>
  )
}

export default ProfileNodal

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"space-between",
    paddingHorizontal:spacingY._20,
  },
  footer:{
    position:"absolute",
    bottom:10,
    right:0,
    left:0,
    alignItems:"center",
    flexDirection:"row",
    justifyContent:"center",
    paddingHorizontal:spacingX._20,
    gap:scale(12),
    paddingTop:spacingY._15,
    borderTopColor:colors.neutral200,
    marginBottom:spacingY._10,
    borderTopWidth:1,
  
  },
  form:{
    gap:spacingY._30,
    marginTop:spacingY._15
  },
  avatarContainer:{
    position:"relative",
    alignSelf:"center"
  },
  avatar:{
    alignSelf:'center',
    backgroundColor:colors.neutral300,
    height:verticalScale(135),
    width:verticalScale(135),
    borderRadius:200,
    borderWidth:1,
    borderColor:colors.neutral500,
    // overflow:"hidden",
    // position:"relative"
  },
  editeIcon:{
    position:'absolute',
    bottom:spacingY._5,
    right:spacingY._7,
    borderRadius:100,
    backgroundColor:colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
    padding:spacingY._7,
  },
  inputContainer:{
    gap:spacingY._7,
  }
})