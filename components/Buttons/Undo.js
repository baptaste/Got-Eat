import React from 'react'
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

import { useResetRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { ingredientsState, userIngredientsState } from '../../store/atoms/globals'
import { colorSchemeState } from '../../store/atoms/settings'

export default function Undo({ marginTop }) {

  const resetIngredients = useResetRecoilState(ingredientsState)
  const resetUserIngredients = useResetRecoilState(userIngredientsState)
  const colorScheme = useRecoilValue(colorSchemeState)

  const resetStates = () => {
    resetIngredients()
    resetUserIngredients()
  }

  return (
    <TouchableOpacity
      onPress={resetStates}
      style={[ GlobalStyles.row, styles.undo, { marginTop: marginTop } ]}
    >
      <Text style={[ GlobalStyles.mediumText, { color: colorScheme === 'dark' ? GlobalStyles.fourthColor.color : 'grey' } ]}>
        Vider l'inventaire
      </Text>
      <Image
        source={require('../../assets/icons/undo-arrow.png')}
        style={{ width: 20, height: 20, tintColor: colorScheme === 'dark' ? GlobalStyles.fourthColor.color : 'grey' }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  undo: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: '20%',
  }
 })