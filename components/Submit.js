import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigate } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

import { useSetRecoilState, useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil'
import { resultState, ingredientsPickedState } from '../store/atoms/globals'
import { colorSchemeState, isLoadingState, isLookingForMoreState, hasSubmitState } from '../store/atoms/settings'
import { recipeQueryState } from '../store/selectors/selectors'

export default function Submit() {

  const navigate = useNavigate()
  const [result, setResult] = useRecoilState(resultState)
  const resetIsLookingForMoreValue = useResetRecoilState(isLookingForMoreState)
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
    // console.log('recipeQuery ==> result :', recipeQuery);
    setResult(recipeQuery)
    resetTotalIngredientsPicked()
    resetIsLookingForMoreValue()
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
      style={[styles.submit, { shadowColor: colorScheme === 'dark' ? '#ddd' : GlobalStyles.secondBg.backgroundColor }]}
    >
      <Text style={[styles.submitBtn, GlobalStyles.bigText]}>GO</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  submit: {
    position: 'absolute',
    bottom: 100,
    left: '30%',
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'hsl(158, 100%, 13%)',
    // backgroundColor: GlobalStyles.secondBg.backgroundColor,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.91,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1000,
  },
  submitBtn: {
    color: 'black',
    // backgroundColor: 'salmon'
  }
})