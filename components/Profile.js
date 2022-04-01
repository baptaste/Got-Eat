import React, { useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native'
import { useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

import { currentLocationState } from '../store/atoms/settings'
import { useRecoilValue, useSetRecoilState, useResetRecoilState, useRecoilState } from 'recoil'
import { signedInState, loggedInState } from '../store/atoms/member'

import PageHead from './PageHead'
import Signup from './Account/Signup'
import Login from './Account/Login'
import DefaultLink from './Links/DefaultLink'

export default function Profile() {

  const { pathname } = useLocation()
  const setCurrentLocation = useSetRecoilState(currentLocationState)
  const $signedIn = useRecoilValue(signedInState)
  const $loggedIn = useRecoilValue(loggedInState)

  useEffect(() => {
    setCurrentLocation(pathname)
  }, [])

  return (
    <View>
      <PageHead title='Profil' />

      { !$signedIn &&
        <DefaultLink path='/account' text='Se connecter' width={200} marginHor='25%' />
      }
    </View>
  )
}

const styles = StyleSheet.create({ })