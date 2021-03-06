import React from 'react'
import {  View } from 'react-native'

import { useRecoilValue } from 'recoil'
import { resultState } from '../../store/atoms/globals'

import ErrorField from './ErrorField'
import SuccessField from './SuccessField'

export default function ResultArea() {
  const result = useRecoilValue(resultState)

  return (
    <View style={{ width: '100%', alignItems: 'center', padding: 16, }}>
      { result?.success ? <SuccessField /> : <ErrorField /> }
    </View>
  )
}