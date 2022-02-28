import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

import { useSetRecoilState, useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil'
import { resultState, currentRecipeState, recipeListState } from '../../store/atoms/globals'
import { colorSchemeState } from '../../store/atoms/settings'

import RightArrow from '../../assets/icons/right-arrow.png'
import SuccessFood from '../../assets/images/food-delivery-light.png'

export default function SuccessField() {

  const colorScheme = useRecoilValue(colorSchemeState)
  const [result, setResult] = useRecoilState(resultState)
  const setRecipe = useSetRecoilState(currentRecipeState)
  const resetResult = useResetRecoilState(resultState)
  const [recipeList, setRecipeList] = useRecoilState(recipeListState)

  const handleRecipePress = (pressedRecipe) => {
    const filteredResultRecipes = result.recipes.filter(recipe => recipe !== pressedRecipe)
    console.log('filteredResultRecipes :', filteredResultRecipes);

    if (filteredResultRecipes.length === 0) {
      // pressed recipe is the only one recipe in result state
      console.log(filteredResultRecipes.length, 'recipes remaining in resultState')
      resetResult()
      console.log('resultState reset !!', result)
      setRecipeList([...recipeList, pressedRecipe].reverse())
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

    setRecipe(pressedRecipe) // set recipe in recipeState then navigate to /result/recipeId
  }

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>

      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Image source={SuccessFood} style={{ width: 100, height: 100 }} />
        <Text style={[GlobalStyles.bigText, GlobalStyles.textBold, { width: '60%' }]}>{result.message}</Text>
      </View>

      <View style={styles.recipeList}>
        {result.recipes.map(recipe => (
          <View key={recipe.id}
            style={[styles.recipeItem, GlobalStyles.secondBg,
            { shadowColor: colorScheme === 'dark' ? 'turquoise' : '#000' }
            ]}>

            <Image
              source={{ uri: `http://192.168.1.33:3000/${recipe.image}`, width: '100%', height: 200 }}
              style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, resizeMode: 'cover' }}
            />

            <Link to={`/result/${recipe.id}`} onPress={() => handleRecipePress(recipe)} style={styles.recipeLink}>
              <View style={styles.linkContent}>
                <Text style={[styles.recipeTitle, GlobalStyles.veryBigText, GlobalStyles.textBold, GlobalStyles.whiteText]}>
                  {recipe.name}
                </Text>

                <View style={styles.seeRecipe}>
                  <Text style={[GlobalStyles.mediumText, GlobalStyles.textBold, GlobalStyles.whiteText ]}>
                    Voir ma recette
                  </Text>
                  <Image source={RightArrow} style={{ width: 20, height: 20, tintColor: 'white' }} />
                </View>
              </View>
            </Link>

          </View>
        ))}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  message: {
    marginVertical: 16
  },
  recipeList: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 30
  },
  recipeItem: {
    width: '100%',
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
  recipeLink: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  recipeTitle: {
    alignSelf: 'flex-start',
  },
  linkContent: {
    width: '100%',
  },
  seeRecipe: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingTop: 20
  }
})