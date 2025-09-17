import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AvatarProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import { colors, radius } from '@/constants/theme'
import { Image } from 'expo-image';
import { getAvatarPath } from '@/services/imageServices'

export default function Avatar({uri,size=60,style,isGroup=false}:AvatarProps) {
  return (
    <View style={[styles.avatar,{height:verticalScale(size),width:verticalScale(size)},style]}>
      <Image
      style={{flex:1}}
      source={getAvatarPath(uri,isGroup)}
      contentFit='cover'
      transition={100}
      
      />
    </View>
  )
}

const styles = StyleSheet.create({
  avatar:{
    alignSelf:"center",
    backgroundColor:colors.neutral200,
    height:verticalScale(47),
    width:verticalScale(47),
    borderRadius:radius.full,
    borderWidth:1,
    borderColor:colors.neutral100,
    overflow:"hidden"
  }
})