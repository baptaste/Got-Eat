import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Link, useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import PageHead from '../components/PageHead'
import RightArrow from '../assets/icons/right-arrow.png'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { resultState, recipeState } from '../store/atoms/globals'
import { currentLocationState, colorSchemeState } from '../store/atoms/settings'

export default function Result() {

  const { pathname } = useLocation()
  const result = useRecoilValue(resultState)
  const colorScheme = useRecoilValue(colorSchemeState)
  const setCurrentLocation = useSetRecoilState(currentLocationState)
  const setRecipe = useSetRecoilState(recipeState)

  useEffect(() => {
    setCurrentLocation(pathname)
  }, [])

  return (
    <View style={styles.result}>

      <PageHead title='Recettes' />

      {!result &&
        <View style={styles.message, { width: '100%', height: 50, position: 'relative' }} >
          <Text style={[GlobalStyles.mediumText, { width: '100%', fontWeight: '300'  }]}>
            Tu n'as pas encore de recettes. Tu peux faire la liste de tes ingrédients dans
          </Text>
          <Link to='/inventory'
            style={{ position: "absolute", bottom: 6, right: 37 }}>
              <Text
                style={[GlobalStyles.mediumText, GlobalStyles.textBold, GlobalStyles.secondColor]}>
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
              style={[styles.recipeItem, GlobalStyles.secondBg,
              { shadowColor: colorScheme === 'dark' ? 'turquoise' : '#000' }
              ]}>

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
                      Voir ma recette
                    </Text>
                    <Image source={RightArrow} style={{ width: 20, height: 20, tintColor: 'white' }} />
                  </View>
                </View>
              </Link>

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
  },
  message: {
    marginVertical: 16
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