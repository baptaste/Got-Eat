import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link, useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import GoBack from '../components/GoBack'

export default function Result({ result, colorScheme, setCurrentLocation }) {
  const { pathname } = useLocation()
  useEffect(() => {
    setCurrentLocation(pathname)
  }, [])

  return (
    <View style={styles.result}>

      <GoBack />

      <Text style={GlobalStyles.hugeText}>
        Recettes
      </Text>

      {!result &&
        <View style={{ width: '100%', height: 50,  marginTop: 22, position: 'relative' }} >
          <Text style={[GlobalStyles.mediumText, { width: '100%', fontWeight: '300'  }]}>
            Tu n'as pas encore de recettes. Tu peux faire la liste de tes ingrédients dans
          </Text>
          <Link to='/'
            style={{ position: "absolute", bottom: 4, right: 40 }}>
              <Text
                style={[GlobalStyles.mediumText, GlobalStyles.textBold,
                { color: '#171780', borderBottomWidth: 3, borderBottomColor: '#171780' }]}>
                  Mon Inventaire
                </Text>
            </Link>
        </View>
      }

      {result &&
        <>
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
        </>
      }

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