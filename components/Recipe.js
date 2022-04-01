import React, { useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import GoBackBtn from './Buttons/GoBackBtn'

import { useRecoilValue, useSetRecoilState, useResetRecoilState, useRecoilState } from 'recoil'
import { currentRecipeState, foundRecipeListState, resultState } from '../store/atoms/globals'
import { currentLocationState } from '../store/atoms/settings'

export default function Recipe() {

  const { pathname } = useLocation()
  const setCurrentLocation = useSetRecoilState(currentLocationState)
  const recipe = useRecoilValue(currentRecipeState)
  const [result, setResult] = useRecoilState(resultState)
  const resetResult = useResetRecoilState(resultState)
  const [foundRecipeList, setFoundRecipeList] = useRecoilState(foundRecipeListState)

  const updateFoundRecipeList = () => {
    const filteredResultRecipes = result.recipes.filter(resultRecipe => resultRecipe !== recipe)
    console.log('filteredResultRecipes :', filteredResultRecipes);

    if (filteredResultRecipes.length === 0) {
      // pressed recipe is the only one recipe in result state
      console.log(filteredResultRecipes.length, 'recipes remaining in resultState')
      resetResult()
      console.log('resultState reset !!', result)
      setFoundRecipeList([...foundRecipeList, recipe].reverse())
    }

    if (filteredResultRecipes.length > 1) {
      /* result.recipes array contains more thant 1 recipe,
         lets update result by removing the recipe user just pressed
      */
      console.log(filteredResultRecipes.length, 'not consulted recipes remaining in resultState')
      const newResult = {
        ...result,
        recipes: [...filteredResultRecipes]
      }
      setResult(newResult)
      console.log('resultState updated ', newResult)
    }
  }

  useEffect(() => {
    setCurrentLocation(pathname)
    console.log('result dans Recipe :', result);
  }, [])

  useEffect(() => {
    if (result !== null) {
      if (result.isAlreadyInState) {
        resetResult()
      } else {
        updateFoundRecipeList()
      }
    }
  }, [result])

  return (
    <>
      <View style={styles.head}>
        <GoBackBtn />

        <View style={styles.headTitle}>
          <Text style={[GlobalStyles.hugeText, GlobalStyles.textCenter]}>
            {recipe.name}
          </Text>
            {recipe.origin &&
              <Text style={[GlobalStyles.mediumText, GlobalStyles.textCenter, { color: 'grey' }]}>
                (Version {recipe.origin.toLowerCase()})
              </Text>
            }
        </View>
      </View>

      {/* <TouchableOpacity style={{ backgroundColor: 'green' }}
        onPress={bookmarkRecipe}
      >
        <Text>Ajouter à mes favoris</Text>
      </TouchableOpacity> */}

      <Text style={[GlobalStyles.veryBigText, { marginVertical: 20, color: GlobalStyles.secondColor.color }]}>
        Tes ingredients pour cette recette
      </Text>

      <View style={styles.ingredients}>
        {recipe.ingredients.map((recipe) => (
          <View  key={recipe._id} style={styles.ingredientItem}>
            <Text style={[styles.ingredientText, GlobalStyles.mediumText, GlobalStyles.textBold, { color: 'black' }]}>
              {recipe.value}
            </Text>
          </View>
        ))}
      </View>

      <Text style={[GlobalStyles.veryBigText, { marginVertical: 20, color: GlobalStyles.secondColor.color }]}>
        Préparation
      </Text>

      <Text style={[GlobalStyles.mediumText, { marginBottom: 16 }]}>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </Text>
      <Text style={[GlobalStyles.mediumText, { marginBottom: 16 }]}>
      Exercitationem soluta, quam magnam quod impedit aliquam.
      </Text>
      <Text style={[GlobalStyles.mediumText, { marginBottom: 16 }]}>
      Quibusdam esse, minus libero, dignissimos itaque cumque nam voluptatum animi modi quisquam qui.
      </Text>
      <Text style={[GlobalStyles.mediumText, { marginBottom: 16 }]}>
      Facere, quae!
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
  headTitle: {
    alignItems: 'flex-start'
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
