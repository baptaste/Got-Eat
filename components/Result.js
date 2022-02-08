import React, { useState } from 'react'
import axios from 'axios'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

export default function Result({ result }) {
  console.log('result :', result);
  return (
    <View style={styles.result}>

      <Text style={[GlobalStyles.bigText, GlobalStyles.textCenter, styles.message]}>{result.message}</Text>

      <View style={styles.recipeList}>

        {result.recipes.map(recipe => (
          <View key={recipe.id} style={styles.recipeItem}>

            <View style={styles.recipeHead}>
              <Text style={([styles.recipeTitle, GlobalStyles.bigText, GlobalStyles.textBold])}>
                {recipe.name}
              </Text>
            </View>

            <View style={styles.ingredients}>
              {recipe.ingredients.map(text => (
                <View style={styles.ingredientItem}>

                  <Text key={text} style={[styles.ingredientText, GlobalStyles.textBold]}>
                    {text}
                  </Text>
                </View>
              ))}
            </View>

          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  result: {
    flex: 1
  },
  message: {
    marginVertical: 30
  },
  recipeList: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 30
  },
  recipeItem: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.51,
    shadowRadius: 10,
    elevation: 15,
  },
  recipeHead: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  recipeTitle: {
    width: '85%',
    paddingVertical: 10,
    color: 'hsl(242, 72%, 44%)',
  },
  ingredients: {
    height: 'fit-content',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between',
  },
  ingredientItem: {
    width: '45%',
    height: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    // paddingBottom: 10,
    // borderRightWidth: 2,
    // borderRightColor: 'hsl(242, 72%, 44%)',
  },
  ingredientText: {
    width: '80%'
  },
  dot: {
    width: 7,
    height: 7,
    backgroundColor: 'hsl(242, 72%, 44%)',
    borderRadius: 3.5
  }
})