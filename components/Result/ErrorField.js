import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

import { useResetRecoilState, useRecoilValue } from 'recoil'
import { resultState, ingredientsState, userIngredientsState } from '../../store/atoms/globals'

import NoFood from '../../assets/images/no-food.png'
import DefaultBtn from '../Buttons/DefaultBtn'
import DefaultLink from '../Links/DefaultLink'

export default function ErrorField() {

  const result = useRecoilValue(resultState)
  const resetResult = useResetRecoilState(resultState)
  const resetIngredients = useResetRecoilState(ingredientsState)
  const resetUserIngredients = useResetRecoilState(userIngredientsState)

  const resetStates = () => {
    resetResult()
    resetIngredients()
    resetUserIngredients()
  }

  return (
    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={[GlobalStyles.mediumText, GlobalStyles.textBold, { width: '100%', color: 'black' }]}>
          {result?.message}
        </Text>
        <Image source={NoFood} style={{ width: 150, height: 150, marginVertical: 32 }} />
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
          <DefaultBtn action={resetStates} text='Cacher' />
          <DefaultLink path='/inventory' action={resetStates} text='Je refais mon inventaire' />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({

})