import React, { useEffect, Suspense } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useLocation } from 'react-router-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

import { currentLocationState } from '../../store/atoms/settings'
import { signedInState, loggedInState } from '../../store/atoms/member'
import { useRecoilValue, useSetRecoilState, useResetRecoilState, useRecoilState } from 'recoil'

import PageHead from '../PageHead'
import Signup from './Signup'
import Login from './Login'

export default function Account() {

  // const { pathname } = useLocation()
  // const setCurrentLocation = useSetRecoilState(currentLocationState)
  const $signedIn = useRecoilValue(signedInState)
  const $loggedIn = useRecoilValue(loggedInState)

  return (
    <View>
      { $signedIn ?
        <Login /> :
        <Suspense fallback={<Text>Loading...</Text>}>
          <Signup />
        </Suspense>
      }
    </View>
  )
}

const styles = StyleSheet.create({ })