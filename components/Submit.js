import React from 'react'
import axios from 'axios'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigate } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

export default function Submit({ state, userIngredients, setResult }) {

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const ingredientsToString = userIngredients.map(item => item.value.toLowerCase())
    const userData = { ...state, ingredientsToString }

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
    <TouchableOpacity onPress={handleSubmit} style={[styles.submit, { shadowColor: 'turquoise' }]}>
      <Text style={[styles.submitBtn, GlobalStyles.bigText]}>J'ai faim</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  submit: {
    position: 'absolute',
    bottom: 80,
    left: '20%',
    width: '60%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: 'hsl(242, 72%, 44%)',
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
    color: 'white',
  }
})