import React from 'react'
import axios from 'axios'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link, useNavigate } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

export default function Submit({ state, userIngredients, setResult }) {

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const userData = { ...state, userIngredients }

    try {
      const res = await axios.post(
        'http://localhost:3000/search/',
        userData,
        {
          headers: {
            Accept: 'application/json'
          },
        }
      );

      console.log('response :', res);

      if (res.status === 200) {
        setResult(res.data)
        navigate('/result')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
      <Text style={[styles.submitBtn, GlobalStyles.bigText]}>J'ai faim</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  submit: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 50,
    backgroundColor: 'hsl(242, 72%, 44%)',
  },
  submitBtn: {
    color: 'white'
  }
})