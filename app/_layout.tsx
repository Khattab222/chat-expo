import React from 'react'
import { Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function _layout() {
  return (
    <Stack screenOptions={{headerShown:false}}/>
  )
}

const styles = StyleSheet.create({})