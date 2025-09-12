import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import Button from '@/components/Button'
import { useAuth } from '@/context/authContext'

export default function home() {
  const {signOut,token} = useAuth()
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <ScreenWrapper>
      <Typo color='white'>home</Typo>
      <Button onPress={handleLogout} >
        <Typo>LogOut</Typo>
      </Button>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({})