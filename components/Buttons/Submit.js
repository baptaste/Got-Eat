import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigate } from 'react-router-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

import { useSetRecoilState, useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil'
import { resultState, ingredientsPickedState } from '../../store/atoms/globals'
import { colorSchemeState, isLoadingState, hasSubmitState } from '../../store/atoms/settings'
import { recipeQueryState } from '../../store/selectors/selectors'

export default function Submit() {

  const navigate = useNavigate()
  const setResult = useSetRecoilState(resultState)
  const recipeQuery = useRecoilValue(recipeQueryState)
  // const setIsLoading = useSetRecoilState(isLoadingState)
  const [hasSubmit, setHasSubmit] = useRecoilState(hasSubmitState)
  const colorScheme = useRecoilValue(colorSchemeState)

  const resetTotalIngredientsPicked = useResetRecoilState(ingredientsPickedState)

  const handleSubmitPress = () => {
    console.log('handleSubmitPress');
    setHasSubmit(true) // recipeQueryState is evaluated
  }

  const handleResponse = () => {
    console.log('handleResponse');
    // setIsLoading(true)
    setResult(recipeQuery)
    resetTotalIngredientsPicked()
    navigate('/result')
  }

  useEffect(() => {
    if (hasSubmit) {
      console.log('useEffect, hasSubmit value :', hasSubmit);
      handleResponse()
    }
  }, [hasSubmit])

  return (
    <TouchableOpacity onPress={handleSubmitPress}
      style={[styles.submit, { backgroundColor: colorScheme === 'dark' ? GlobalStyles.mainBgLight.backgroundColor : GlobalStyles.mainBgDark.backgroundColor }]}
    >
      <Text style={[styles.submitBtn, GlobalStyles.bigText]}>J'ai faim</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  submit: {
    position: 'absolute',
    bottom: 100,
    left: '25%',
    // transform: [{ translateX: -50 }, { translateY: 50 }],
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 2,
    shadowColor: GlobalStyles.secondColor.color,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.91,
    shadowRadius: 10,
    elevation: 15,
    zIndex: 1000,
  },
  submitBtn: {
    color: GlobalStyles.secondColor.color
  }
})