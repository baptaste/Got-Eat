import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import PageHead from '../components/PageHead'
import UndoBtn from './Buttons/UndoBtn'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userIngredientsState, categoryState } from '../store/atoms/globals'
import { currentLocationState, colorSchemeState } from '../store/atoms/settings'
import { categoryListQueryState } from '../store/selectors/getRequests'

import AddMoreLink from './Links/AddMoreLink'

import RemoveIcon from '../assets/icons/minus.png'

export default function Cart({ handleIngredientPick }) {

  const $categoryList = useRecoilValue(categoryListQueryState)

  const $userIngredients = useRecoilValue(userIngredientsState)
  // const storeIngredients = useRecoilValue(ingredientsState)
  const $colorScheme = useRecoilValue(colorSchemeState)

  const { pathname } = useLocation()
  const setCurrentLocation = useSetRecoilState(currentLocationState)

  const [filteredCategoryList, setFilteredCategoryList] = useState([])
  const setCategory = useSetRecoilState(categoryState)

  const getFilteredCategoryList = () => {
    let deepCategoryListCopy = JSON.parse(JSON.stringify($categoryList))

    deepCategoryListCopy = deepCategoryListCopy.filter(category => {
      const matchingCategories = []

      $userIngredients.forEach(ingredient => {
        if (category.name === ingredient.name) matchingCategories.push(category)
      })

      if (matchingCategories.length) return matchingCategories
    })

    deepCategoryListCopy = deepCategoryListCopy.filter(category => {
      const matchingIngredients = []

      category.ingredients.map(categoryIngredient => {
        $userIngredients.forEach(userIngredient => {
          if (categoryIngredient.value === userIngredient.value) matchingIngredients.push(userIngredient)
        })
      })

      category.ingredients = matchingIngredients
      return matchingIngredients
    })

    setFilteredCategoryList(deepCategoryListCopy)
  }

  const handleAddMoreIngredients = (targetCategory) => {
    const foundCategory = $categoryList.find(category => category.name === targetCategory.name)
    setCategory(foundCategory)
  }

  const [ingredientPressed, setIngredientPressed] = useState(null)

  const handleRemoveIngredient = () => {
    let newFilteredCategoryList = JSON.parse(JSON.stringify(filteredCategoryList))

    newFilteredCategoryList = newFilteredCategoryList.filter(category => {
      category.ingredients = category.ingredients.map(ingredient => {
        if (ingredient.value !== ingredientPressed.value) {
          return typeof ingredient === 'object' && ingredient !== undefined && ingredient
        }
      })
      if (category.ingredients.length && !category.ingredients.includes(undefined)) {
        return category
      }
    })

    let targetBoolean = null

    filteredCategoryList.map(category => {
      category.ingredients.find(ingredient => {
       if (ingredient === ingredientPressed) {
        targetBoolean = category.boolean
       }
      })
    })

    handleIngredientPick(ingredientPressed.name, targetBoolean, ingredientPressed)
    setFilteredCategoryList(newFilteredCategoryList)
  }

  useEffect(() => {
    setCurrentLocation(pathname)
    getFilteredCategoryList()
  }, [$userIngredients])

  return (

    <View style={styles.cartScreen}>
      <PageHead title='Mes ingrédients' />

      <Text style={[GlobalStyles.bigText, GlobalStyles.textBold, GlobalStyles.textCenter, { marginVertical: 16, color: 'grey' }]}>
        {`${$userIngredients.length - 2} ${($userIngredients.length - 2) > 1 ? 'sélectionnés' : 'sélectionné'}` }
      </Text>

      {$userIngredients.length >= 3 &&
        <UndoBtn marginTop={10}
      />}


      <View style={{ marginVertical: 20 }}>
        <Text style={[GlobalStyles.whiteText, GlobalStyles.hugeText, styles.category]}>Les essentiels</Text>
        <View style={[styles.ingredientsList]}>
          {$userIngredients.map(ingredient => ingredient.name === 'default' && (
            <View
              key={ingredient.value}
              style={styles.ingredient}
              >
              <Image
                source={ingredient.image}
                accessibilityLabel={ingredient.value}
                style={{ width: 40, height: 40, marginBottom: 10 }}
                tintColor={$colorScheme === 'dark' ? 'white' : 'black'}
              />
              <Text style={[GlobalStyles.smallText, GlobalStyles.textBold, GlobalStyles.textCenter, { color: $colorScheme === 'dark' ? 'white' : 'black' }]}>
                {ingredient.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {filteredCategoryList.map(category => (
        <View key={category._id} style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[GlobalStyles.whiteText, GlobalStyles.hugeText, styles.category]}>
              {category.title}
            </Text>
            <AddMoreLink action={() => handleAddMoreIngredients(category)} path='/inventory/ingredients' />
          </View>


          <View style={[styles.ingredientsList]}>
            {category.ingredients.map(ingredient => {
              // console.log('ingredient dans le map de Cart', ingredient);
              return (
                <TouchableOpacity
                  key={ingredient.value}
                  style={[styles.ingredient]}
                  onLongPress={() => setIngredientPressed(ingredient)}
                >
                  <Image
                    source={{ uri: ingredient.image_url }}
                    accessibilityLabel={ingredient.value}
                    style={{ width: 40, height: 40, marginBottom: 10 }}
                    tintColor={$colorScheme === 'dark' ? 'white' : 'black'}
                  />
                  <Text
                    style={[GlobalStyles.smallText, GlobalStyles.textBold, GlobalStyles.textCenter,
                    { color: $colorScheme === 'dark' ? 'white' : 'black' }]}
                  >
                    {ingredient.value}
                  </Text>
                  {ingredientPressed === ingredient &&
                    <TouchableOpacity style={[styles.removeButton]} onPress={handleRemoveIngredient}>
                      <Image source={RemoveIcon} style={{ width: 30, height: 30, tintColor: 'crimson' }} />
                    </TouchableOpacity>
                  }
                </TouchableOpacity>
              )
            })}

          </View>
      </View>
      ))}

    </View>
  )
}

const styles = StyleSheet.create({
  ingredientsList: {
    width: '100%',
    // height: '85%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    marginVertical: 10,
  },
  ingredient: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 22,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  category: {
    color: GlobalStyles.secondColor.color,
    marginRight: 16
  },
  retryButton: {
    width: 40,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
    // marginVertical: 16,
    marginLeft: 16,
    borderRadius: 40 / 2,
    backgroundColor: '#212227',
  },
  removeButton: {
    marginTop: 16
    // width: 40,
    // height: 40,
    // flexDirection: 'row',
    // alignItems: 'center',
    // alignSelf: 'flex-end',
    // justifyContent: 'space-evenly',
    // marginVertical: 16,
    // borderRadius: 20 / 2,
    // backgroundColor: '#212227',
  }
})
