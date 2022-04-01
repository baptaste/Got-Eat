import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

import { useSetRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  foundRecipeListState,
  currentRecipeState,
  ingredientsState,
  userIngredientsState,
} from '../../store/atoms/globals'
// import { colorSchemeState } from '../../store/atoms/settings'

import AddMoreLink from '../Links/AddMoreLink'


export default function FoundRecipeList() {

  const recipes = useRecoilValue(foundRecipeListState)
  const setRecipe = useSetRecoilState(currentRecipeState)
  const resetIngredients = useResetRecoilState(ingredientsState)
  const resetUserIngredients = useResetRecoilState(userIngredientsState)
  // const colorScheme = useRecoilValue(colorSchemeState)

  const handleAddMoreRecipe = () => {
    resetIngredients()
    resetUserIngredients()
  }

  const handleBookmarkPress = () => {

  }

  return (
    <View style={{ width: '100%', padding: 16 }}>

      <View
        style={{ width: '100%', flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between' }}>
        <Text style={[GlobalStyles.bigText]}>Mes recettes trouvées</Text>

        { recipes.length && <AddMoreLink action={handleAddMoreRecipe} path='/inventory' /> }
      </View>


      <View style={styles.recipeList}>

          { recipes.map(recipe => (
            <Link key={recipe._id} to={`/result/${recipe._id}`} onPress={() => setRecipe(recipe)} style={{ marginBottom: 24 }}>
              <View style={styles.recipeLink}>
                <Image
                  source={{ uri: recipe.image_url, width: 80, height: 80 }}
                  style={{ borderRadius: 10, resizeMode: 'cover' }}
                />
                <View style={styles.linkContent}>
                  <Text style={[GlobalStyles.bigText, GlobalStyles.textBold, { color: 'black' }]}>
                    {recipe.name} <Text style={[GlobalStyles.smallText, { color: 'grey' }]}>{recipe.origin && recipe.origin}</Text>
                  </Text>
                  <View style={styles.seeRecipe}>
                    <View>
                      <Text style={[GlobalStyles.smallText, GlobalStyles.textBold, {  color: 'grey' } ]}>
                        {recipe.ingredients.length} ingrédients
                      </Text>
                      <Text style={[GlobalStyles.smallText, GlobalStyles.textBold, { color: 'grey' } ]}>
                        Préparation détailée
                      </Text>
                    </View>
                    <TouchableOpacity onPress={handleBookmarkPress}>
                      <Text>+ Favoris</Text>
                    </TouchableOpacity>
                    {/* <Image source={RightArrow}
                      style={{ width: 24, height: 24, tintColor: 'grey', alignSelf: 'flex-end' }}
                    /> */}
                  </View>
                </View>
              </View>
            </Link>
          )) }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  recipeList: {
    // flex: 5,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  recipeLink: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkContent: {
    width: '70%',
  },
  seeRecipe: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})