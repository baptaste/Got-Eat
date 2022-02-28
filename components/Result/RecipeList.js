import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

import { useSetRecoilState, useRecoilValue } from 'recoil'
import { recipeListState, currentRecipeState } from '../../store/atoms/globals'
import { colorSchemeState } from '../../store/atoms/settings'

import RightArrow from '../../assets/icons/right-arrow.png'

export default function RecipeList() {
  const recipes = useRecoilValue(recipeListState)
  const setRecipe = useSetRecoilState(currentRecipeState)
  const colorScheme = useRecoilValue(colorSchemeState)

  return (
    <View style={{ width: '100%', padding: 16 }}>

      <Text style={[GlobalStyles.bigText]}>Mes recettes trouvées</Text>

      <View style={styles.recipeList}>

          {recipes.map(recipe => (
            <View key={recipe.id}
              style={[styles.recipeItem, GlobalStyles.secondBg,
                { shadowColor: colorScheme === 'dark' ? 'turquoise' : '#000' }
              ]}
            >
              <Image
                source={{ uri: `http://192.168.1.33:3000/${recipe.image}`, width: '100%', height: 200 }}
                style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, resizeMode: 'cover' }}
              />

              <Link to={`/result/${recipe.id}`} onPress={() => setRecipe(recipe)} style={styles.recipeLink}>
                <View style={styles.linkContent}>
                  <Text style={[styles.recipeTitle, GlobalStyles.veryBigText, GlobalStyles.textBold, GlobalStyles.whiteText]}>
                    {recipe.name}
                  </Text>

                  <View style={styles.seeRecipe}>
                    <Text style={[GlobalStyles.mediumText, GlobalStyles.textBold, GlobalStyles.whiteText ]}>
                      Revoir ma recette
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
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingTop: 20
  }
})