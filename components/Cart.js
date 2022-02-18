import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import PageHead from '../components/PageHead'
import Undo from '../components/Undo'
import _ from 'lodash'

export default function Cart({ setCurrentLocation, clearState, userIngredients, colorScheme, dataItems }) {

  const { pathname } = useLocation()
  const [filteredIngredients, setFilteredIngredients] = useState([])

  useEffect(() => {
    setCurrentLocation(pathname)
    getFilteredIngredients()
  }, [userIngredients])

  const getFilteredIngredients = () => {
    let deepDataItemsCopy = _.cloneDeep(dataItems)

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

  return (

    <View style={styles.cartScreen}>
      <PageHead title='Mes ingrédients' />

      <Text style={[GlobalStyles.bigText, GlobalStyles.textBold, GlobalStyles.textCenter, { marginVertical: 16, color: 'grey' }]}>
        {`${userIngredients.length - 2} ${(userIngredients.length - 2) > 1 ? 'sélectionnés' : 'sélectionné'}` }
      </Text>

      {userIngredients.length >= 3 &&
        <Undo clearState={clearState} colorScheme={colorScheme} marginTop={10}
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
                tintColor={GlobalStyles.fourthColor.color}
              />
              <Text style={[GlobalStyles.smallText, GlobalStyles.textBold, GlobalStyles.textCenter, { color: GlobalStyles.fourthColor.color }]}>
                {ingredient.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {filteredIngredients.map(item => (
        <View key={item.id} style={{ marginBottom: 20 }}>
          <Text style={[GlobalStyles.whiteText, GlobalStyles.hugeText, styles.category]}>
            {item.label}
          </Text>

          <View style={[styles.ingredientsList]}>
            {item.options.map(ingredient => (
              <View
                key={ingredient.value}
                style={[styles.ingredient]}
              >
                <Image
                  source={ingredient.image}
                  accessibilityLabel={ingredient.value}
                  style={{ width: 40, height: 40, marginBottom: 10 }}
                  tintColor={GlobalStyles.fourthColor.color}
                />
                <Text
                  style={[GlobalStyles.smallText, GlobalStyles.textBold, GlobalStyles.textCenter,
                  { color: GlobalStyles.fourthColor.color }]}
                >
                  {ingredient.value}
                </Text>
              </View>
            ))}

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
  }
})
