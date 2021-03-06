import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link, useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import PageHead from '../components/PageHead'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { categoryState, ingredientsState, userIngredientsState } from '../store/atoms/globals'
import { currentLocationState, colorSchemeState, windowHeightState } from '../store/atoms/settings'

export default function Ingredients({ handleIngredientPick }) {

  const $category = useRecoilValue(categoryState)
  const $ingredients = useRecoilValue(ingredientsState)
  const $userIngredients = useRecoilValue(userIngredientsState)
  const $colorScheme = useRecoilValue(colorSchemeState)
  const windowHeight = useRecoilValue(windowHeightState)

  const { pathname } = useLocation()
  const setCurrentLocation = useSetRecoilState(currentLocationState)

  useEffect(() => {
    setCurrentLocation(pathname)
  }, [])

  return (
    // <View style={{ height: windowHeight - 100 }}>
    <View style={{ flex: 1 }}>

      <PageHead title={$category.title !== null && $category.title} />

      {$ingredients[$category.name].length >= 1 &&
        <Link
          to='/inventory'
          style={styles.validate}
        >
          <Text style={[styles.validateBtn, GlobalStyles.secondBg, GlobalStyles.mediumText, GlobalStyles.textCenter, GlobalStyles.textBold]}>
            C'est tout
          </Text>
        </Link>
        }

      <View style={styles.ingredientsList}>

        {$category.ingredients.map((ingredient, index) => (
          <TouchableOpacity
            onPress={() => handleIngredientPick($category.name, $category.boolean, ingredient)}
            key={ingredient._id}
            style={styles.ingredient}
            // disabled={ingredientsPicked.includes(ingredient.value)}
          >
              <Image
                source={{ uri: ingredient.image_url, width: 40, height: 40 }}
                accessibilityLabel={ingredient.value}
                style={{ marginBottom: 10 }}
                tintColor={$colorScheme === 'dark' ?
                  $userIngredients.includes(ingredient) ? GlobalStyles.secondColor.color : 'white' // dark mode
                  : $userIngredients.includes(ingredient) ? GlobalStyles.secondColor.color : 'black' // light mode
              }
              />

              <Text style={
                $userIngredients.includes(ingredient) ?
                [GlobalStyles.smallText, GlobalStyles.textBold, GlobalStyles.textCenter, styles.picked]
                  // { color: $colorScheme === 'dark' ? '' : '#251fc1' }]
                : [GlobalStyles.smallText, GlobalStyles.textBold, GlobalStyles.textCenter, { color: 'black' }]
              }
              >
                {ingredient.value}
              </Text>

          </TouchableOpacity>
        ))}

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  ingredientsList: {
    width: '100%',
    height: '85%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32
  },
  ingredient: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  picked: {
    color: GlobalStyles.secondColor.color
  },
  validate: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 15
  },
  validateBtn: {
    width: 120,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 7,
    color: GlobalStyles.mainColorDark.color
  },
})
