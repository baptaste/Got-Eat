import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

export default function Result({ result, colorScheme }) {
  console.log('RESULT // ', result);
  return (
    <View style={styles.result}>

      <Text style={GlobalStyles.hugeText}>
        {result.status === 'Success' && result.recipes ? 'Recettes' : 'Recette'}
      </Text>
      <Text style={[GlobalStyles.bigText, styles.message]}>{result.message}</Text>

      <View style={styles.recipeList}>

        {result.recipes && result.recipes.map(recipe => (
          <View key={recipe.id}
            style={[styles.recipeItem,
            { backgroundColor: '#171780', shadowColor: colorScheme === 'dark' ? 'turquoise' : '#000' }
            ]}>

            <View style={styles.recipeHead}>
              <Text style={([styles.recipeTitle, GlobalStyles.veryBigText, GlobalStyles.textBold])}>
                {recipe.name}
              </Text>
            </View>

            <View style={styles.ingredients}>
              {recipe.ingredients.map((text, index) => (
                <View  key={text + index} style={styles.ingredientItem}>

                  <Text key={text} style={[styles.ingredientText, GlobalStyles.textBold, GlobalStyles.whiteText]}>
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
    flex: 1,
    // marginTop: 60
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
    marginBottom: 30,
    borderRadius: 10,
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
    paddingVertical: 30,
    // color: 'hsl(242, 72%, 44%)',
    color: 'white'
  },
  ingredients: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between',
  },
  ingredientItem: {
    width: '45%',
    // height: 57,
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