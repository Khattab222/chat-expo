import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { TypoProps } from '@/types'
import { colors } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'

export default function Typo({
  size=16,
  color=colors.text,
  fontWeight="400",
  children,
  style,
  textProps={}
}:TypoProps) {


  const textStyle:TextStyle = {
    fontSize: verticalScale(size),
    color,
    fontWeight,
  }

  return (
  <Text style={[textStyle, style]} {...textProps}>
    {children}
  </Text>
  )
}

