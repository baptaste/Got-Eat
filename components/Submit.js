import React, { useState } from 'react'
import axios from 'axios'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

export default function Submit({ state, userIngredients, setResult }) {

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

      if (res.status === 200) setResult(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Link to='/result' style={styles.submit} onPress={handleSubmit}>
      <Text style={[styles.submitBtn, GlobalStyles.bigText]}>J'ai faim</Text>
    </Link>
  )
}

const styles = StyleSheet.create({
  submit: {
    width: '50%',
    margin: 'auto'
  },
  submitBtn: {
    display: 'grid',
    placeItems: 'center',
    width: 200,
    height: 200,
    marginTop: 120,
    marginBottom: 30,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: '50%',
    backgroundColor: 'hsl(242, 72%, 44%)',
    color: 'white'
  }
})