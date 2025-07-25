import {  ActivityIndicator, ActivityIndicatorBase, ActivityIndicatorComponent, ActivityIndicatorProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'

export default function Loading({
  size="large",
  color=colors.primaryDark,
}:ActivityIndicatorProps) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={size} color={color} animating={true} />
    </View>
  )
}

const styles = StyleSheet.create({})