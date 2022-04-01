import React, { useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useLocation } from 'react-router-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

import { currentLocationState } from '../../store/atoms/settings'
import { signedInState, loggedInState } from '../../store/atoms/member'
import { useRecoilValue, useSetRecoilState, useResetRecoilState, useRecoilState } from 'recoil'

import PageHead from '../PageHead'

export default function Login() {

  // const { pathname } = useLocation()
  // const setCurrentLocation = useSetRecoilState(currentLocationState)
  const $signedIn = useRecoilValue(signedInState)
  const $loggedIn = useRecoilValue(loggedInState)

  return (
    <View>
      <PageHead title='Se connecter' />
      <Text>user signed in ? {$signedIn.toString()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({ })