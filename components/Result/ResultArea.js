import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

import { useSetRecoilState, useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil'
import { resultState } from '../../store/atoms/globals'

import ErrorField from './ErrorField'
import SuccessField from './SuccessField'

export default function ResultArea() {
  const result = useRecoilValue(resultState)

  return (
    <View style={{ width: '100%', alignItems: 'center', padding: 16 }}>
      { result.status === 'Error' ? <ErrorField /> : <SuccessField /> }
    </View>
  )
}