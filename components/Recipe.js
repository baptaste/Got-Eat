import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import GoBack from '../components/GoBack'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentRecipeState, recipeListState, resultState } from '../store/atoms/globals'
import { currentLocationState } from '../store/atoms/settings'

export default function Recipe() {

  const { pathname } = useLocation()
  const setCurrentLocation = useSetRecoilState(currentLocationState)
  const recipe = useRecoilValue(currentRecipeState)
  // console.log('currentRecipeState :', recipe);
  // const recipeList = useRecoilValue(recipeListState)
  // const result = useRecoilValue(resultState)

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

      <Text style={[GlobalStyles.veryBigText, { marginVertical: 20, color: GlobalStyles.secondColor.color }]}>
        Tes ingredients pour cette recette
      </Text>

      <View style={styles.ingredients}>
        {recipe.ingredients.map((text, index) => (
          <View  key={text + index} style={styles.ingredientItem}>
            <Text key={text} style={[styles.ingredientText, GlobalStyles.mediumText, GlobalStyles.textBold, { color: 'black' }]}>
              {text}
            </Text>
          </View>
        ))}
      </View>

      <Text style={[GlobalStyles.veryBigText, { marginVertical: 20, color: GlobalStyles.secondColor.color }]}>
        Préparation
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
