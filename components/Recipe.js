import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import GoBack from '../components/GoBack'

export default function Recipe({ setCurrentLocation, recipe }) {
  const { pathname } = useLocation()

  useEffect(() => {
    setCurrentLocation(pathname)
  }, [])

  return (
    <>
      <View style={styles.head}>
        <GoBack />

        <Text style={[GlobalStyles.hugeText, GlobalStyles.textCenter]}>
          {recipe.name}
        </Text>
      </View>

      <Text style={[GlobalStyles.bigText, { marginVertical: 20 }]}>
        Tes ingredients pour cette recette
      </Text>

      <View style={styles.ingredients}>
        {recipe.ingredients.map((text, index) => (
          <View  key={text + index} style={styles.ingredientItem}>
            <Text key={text} style={[styles.ingredientText, GlobalStyles.textBold, { color: 'black' }]}>
              {text}
            </Text>
          </View>
        ))}
      </View>

      <Text style={[GlobalStyles.bigText, { marginVertical: 20 }]}>
        Pour la préparation
      </Text>
    </>
  )
}

const styles = StyleSheet.create({
  head: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  ingredients: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between',
  },
  ingredientItem: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 16,
  },
  ingredientText: {
    width: '100%',
    textAlign: 'center',
  },
})
