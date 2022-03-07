import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

import { useSetRecoilState, useRecoilValue } from 'recoil'
import { foundRecipeListState, currentRecipeState } from '../../store/atoms/globals'
import { colorSchemeState } from '../../store/atoms/settings'

import AddMore from '../Buttons/AddMore'

// import RightArrow from '../../assets/icons/right-arrow.png'

export default function FoundRecipeList() {

  const baseAPIurl = 'http://192.168.1.33:3000/'
  const recipes = useRecoilValue(foundRecipeListState)
  const setRecipe = useSetRecoilState(currentRecipeState)
  // const colorScheme = useRecoilValue(colorSchemeState)

  return (
    <View style={{ width: '100%', padding: 16 }}>

      <View
        style={{ width: '100%', flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between' }}>
        <Text style={[GlobalStyles.bigText]}>Mes recettes trouvées</Text>
        <AddMore />
      </View>


      <View style={styles.recipeList}>

          {recipes.map(recipe => (
            <Link key={recipe.id} to={`/result/${recipe.id}`} onPress={() => setRecipe(recipe)} style={{ marginBottom: 24 }}>
              <View style={styles.recipeLink}>
                <Image
                  source={{ uri: `${baseAPIurl}${recipe.image}`, width: 80, height: 80 }}
                  style={{ borderRadius: 10, resizeMode: 'cover' }}
                />
                <View style={styles.linkContent}>
                  <Text style={[GlobalStyles.bigText, GlobalStyles.textBold, { color: 'black' }]}>
                    {recipe.name}
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
                    {/* <Image source={RightArrow}
                      style={{ width: 24, height: 24, tintColor: 'grey', alignSelf: 'flex-end' }}
                    /> */}
                  </View>
                </View>
              </View>
            </Link>
          ))}
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