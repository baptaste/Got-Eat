import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { Link, useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import PageHead from '../components/PageHead'
import Undo from './Buttons/Undo'
import _ from 'lodash'

import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { dataItemsState, userIngredientsState, categoryState, ingredientsState } from '../store/atoms/globals'
import { currentLocationState, colorSchemeState } from '../store/atoms/settings'
import { totalIngredientsListState } from '../store/selectors/selectors'

import AddMoreIcon from '../assets/icons/addmore.png'
import RemoveIcon from '../assets/icons/minus.png'

export default function Cart({ handleIngredientPick }) {

  const storeDataItems = useRecoilValue(dataItemsState)
  const userIngredients = useRecoilValue(userIngredientsState)
  const storeIngredients = useRecoilValue(ingredientsState)
  const colorScheme = useRecoilValue(colorSchemeState)

  const { pathname } = useLocation()
  const setCurrentLocation = useSetRecoilState(currentLocationState)

  const [filteredIngredients, setFilteredIngredients] = useState([])
  const setCategory = useSetRecoilState(categoryState)

  const getFilteredIngredients = () => {
    let deepDataItemsCopy = _.cloneDeep(storeDataItems)

    deepDataItemsCopy = deepDataItemsCopy.filter(category => {
      const matchingCategories = []

      userIngredients.forEach(ingredient => {
        if (category.name === ingredient.name) matchingCategories.push(category)
      })

      if (matchingCategories.length !== 0) return matchingCategories
    })

    deepDataItemsCopy = deepDataItemsCopy.filter(category => {
      const matchingIngredients = []

      category.options.map(option => {
        userIngredients.forEach(ingredient => {
          if (option.value === ingredient.value) matchingIngredients.push(ingredient)
        })
      })

      category.options = matchingIngredients
      return matchingIngredients
    })

    setFilteredIngredients(deepDataItemsCopy)
  }

  const handleAddMoreIngredients = (ingredientsCategory) => {
    const foundCategory = storeDataItems.find(category => category.name === ingredientsCategory.name)
    setCategory(foundCategory)
  }

  const [ingredientPressed, setIngredientPressed] = useState(null)

  const handleRemoveIngredient = () => {
    let newFilteredIngredients = _.cloneDeep(filteredIngredients)

    newFilteredIngredients = newFilteredIngredients.filter(category => {
      category.options = category.options.map(ingredient => {
        if (ingredient.value !== ingredientPressed.value) {
          return typeof ingredient === 'object' && ingredient !== undefined && ingredient
        }
      })
      if (category.options.length !== 0 && !category.options.includes(undefined)) {
        return category
      }
    })

    let targetBoolean = null

    filteredIngredients.map(obj => {
      obj.options.find(ing => {
       if (ing === ingredientPressed) {
        targetBoolean = obj.boolean.name
       }
      })
    })

    handleIngredientPick(ingredientPressed.name, targetBoolean, ingredientPressed)
    setFilteredIngredients(newFilteredIngredients)
  }

  useEffect(() => {
    setCurrentLocation(pathname)
    getFilteredIngredients()
  }, [userIngredients])


  return (

    <View style={styles.cartScreen}>
      <PageHead title='Mes ingrédients' />

      <Text style={[GlobalStyles.bigText, GlobalStyles.textBold, GlobalStyles.textCenter, { marginVertical: 16, color: 'grey' }]}>
        {`${userIngredients.length - 2} ${(userIngredients.length - 2) > 1 ? 'sélectionnés' : 'sélectionné'}` }
      </Text>

      {userIngredients.length >= 3 &&
        <Undo marginTop={10}
      />}


      <View style={{ marginVertical: 20 }}>
        <Text style={[GlobalStyles.whiteText, GlobalStyles.hugeText, styles.category]}>Les essentiels</Text>
        <View style={[styles.ingredientsList]}>
          {userIngredients.map(ingredient => ingredient.name === 'default' && (
            <View
              key={ingredient.value}
              style={styles.ingredient}
              >
              <Image
                source={ingredient.image}
                accessibilityLabel={ingredient.value}
                style={{ width: 40, height: 40, marginBottom: 10 }}
                tintColor={colorScheme === 'dark' ? 'white' : 'black'}
              />
              <Text style={[GlobalStyles.smallText, GlobalStyles.textBold, GlobalStyles.textCenter, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>
                {ingredient.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {filteredIngredients.map(item => (
        <View key={item.id} style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[GlobalStyles.whiteText, GlobalStyles.hugeText, styles.category]}>
              {item.label}
            </Text>
            <Link to='/inventory/ingredients' onPress={() => handleAddMoreIngredients(item)} style={[styles.retryButton]}>
              <Image source={AddMoreIcon} style={{ width: 20, height: 20, tintColor: 'white' }} />
            </Link>
          </View>


          <View style={[styles.ingredientsList]}>
            {item.options.map(ingredient => {
              // console.log('ingredient dans le map de Cart', ingredient);
              return (
                <TouchableOpacity
                  key={ingredient.value}
                  style={[styles.ingredient]}
                  onLongPress={() => setIngredientPressed(ingredient)}
                >
                  <Image
                    source={ingredient.image}
                    accessibilityLabel={ingredient.value}
                    style={{ width: 40, height: 40, marginBottom: 10 }}
                    tintColor={colorScheme === 'dark' ? 'white' : 'black'}
                  />
                  <Text
                    style={[GlobalStyles.smallText, GlobalStyles.textBold, GlobalStyles.textCenter,
                    { color: colorScheme === 'dark' ? 'white' : 'black' }]}
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
    color: GlobalStyles.secondColor.color
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
