import React from 'react'
import axios from 'axios'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigate } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

import { useSetRecoilState, useRecoilValue } from 'recoil'
import { resultState, ingredientsState, userIngredientsState } from '../store/atoms/globals'
import { colorSchemeState } from '../store/atoms/settings'

export default function Submit() {

  const navigate = useNavigate()

  const setResult = useSetRecoilState(resultState)
  const ingredients = useRecoilValue(ingredientsState)
  const userIngredients = useRecoilValue(userIngredientsState)
  const colorScheme = useRecoilValue(colorSchemeState)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const ingredientsToString = userIngredients.map(item => item.value.toLowerCase())
    const userData = {
      ...ingredients,
      ingredientsToString
    }

    try {
      const res = await axios.post(
        // 'http://10.0.2.2:3000/search/',
        'http://192.168.1.33:3000/search/',
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: 'application/json'
          },
        }
      );

      // console.log('response :', res);

      if (res.status === 200) {
        setResult(res.data)
        navigate('/result')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TouchableOpacity onPress={handleSubmit} style={[styles.submit, { shadowColor: colorScheme === 'dark' ? '#ddd' : 'hsl(158, 100%, 13%)' }]}>
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