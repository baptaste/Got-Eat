import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'

import { useRecoilValue, useResetRecoilState } from 'recoil'
import { foundRecipeListState, ingredientsState, userIngredientsState } from '../../store/atoms/globals'

import AddMoreIcon from '../../assets/icons/addmore.png'

export default function AddMore() {
  const recipesList = useRecoilValue(foundRecipeListState)
  const resetIngredients = useResetRecoilState(ingredientsState)
  const resetUserIngredients = useResetRecoilState(userIngredientsState)

  const handleAddMoreRecipe = () => {
    resetIngredients()
    resetUserIngredients()
  }

  return (
    recipesList.length !== 0 &&
      <Link to='/inventory' onPress={handleAddMoreRecipe} style={[styles.retryButton]}>
        <Image source={AddMoreIcon} style={{ width: 20, height: 20, tintColor: 'white' }} />
      </Link>
  )
}

const styles = StyleSheet.create({
  retryButton: {
    width: 40,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
    marginVertical: 16,
    borderRadius: 40 / 2,
    backgroundColor: '#212227',
  }
})