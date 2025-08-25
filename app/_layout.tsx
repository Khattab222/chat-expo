import React from 'react'
import { Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { AuthProvider } from '@/context/authContext'

 function StackLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}/>
  )
}
export default function RootLayout() {
  return (
    <AuthProvider>

    <StackLayout/>
    </AuthProvider>
  )
}

const styles = StyleSheet.create({})