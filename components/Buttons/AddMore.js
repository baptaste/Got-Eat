import React from 'react'
import { Text, Image, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'

import { useRecoilValue, useResetRecoilState } from 'recoil'
import { recipeListState, ingredientsState, userIngredientsState } from '../../store/atoms/globals'

import { GlobalStyles } from '../../styles/GlobalStyles'
import AddMoreIcon from '../../assets/icons/addmore.png'

export default function AddMore() {
  const recipesList = useRecoilValue(recipeListState)
  const resetIngredients = useResetRecoilState(ingredientsState)
  const resetUserIngredients = useResetRecoilState(userIngredientsState)

  const handleAddMoreRecipe = () => {
    resetIngredients()
    resetUserIngredients()
  }

  return (
    recipesList.length !== 0 &&
      <Link to='/inventory' onPress={handleAddMoreRecipe} style={[styles.retryButton]}>
        <Image source={AddMoreIcon} style={{ width: 24, height: 24, tintColor: 'white' }} />
      </Link>
  )
}

const styles = StyleSheet.create({
  retryButton: {
    position: 'absolute',
    bottom: 80,
    right: 15,
    // width: 180,
    width: 55,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
    // paddingVertical: 10,
    // paddingHorizontal: 25,
    marginVertical: 16,
    borderRadius: 55 / 2,
    backgroundColor: '#212227',
    // borderWidth: 1.5,
    // borderColor: GlobalStyles.secondBg.backgroundColor
  }
})