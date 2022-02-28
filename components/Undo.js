import React from 'react'
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'

import { useResetRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { ingredientsState, userIngredientsState, resultState } from '../store/atoms/globals'
import { colorSchemeState, isLookingForMoreState } from '../store/atoms/settings'

export default function Undo({ marginTop }) {

  const resetIngredients = useResetRecoilState(ingredientsState)
  const resetUserIngredients = useResetRecoilState(userIngredientsState)
  const colorScheme = useRecoilValue(colorSchemeState)
  const result = useRecoilValue(resultState)

  const setIsLookingForMore = useSetRecoilState(isLookingForMoreState)

  const resetStates = () => {
    resetIngredients()
    resetUserIngredients()

    if (result !== null) {
      // user already found a recipe but is looking for more
      setIsLookingForMore(true)
    }
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
        source={require('../assets/icons/undo-arrow.png')}
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