import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link, useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import PageHead from '../components/PageHead'

export default function Ingredients({
  category,
  userIngredients,
  currentIngredientsPicked,
  setCurrentIngredientsPicked,
  handleIngredientPick,
  stepsCompleted,
  setStepsCompleted,
  colorScheme,
  windowHeight,
  setCurrentLocation,
  state
}) {

  const { pathname } = useLocation()

  useEffect(() => {
    setCurrentLocation(pathname)
  }, [])

  const handleIngredientPress = (categoryName, booleanName, option) => {
    if (userIngredients.includes(option)) {
      // remove ingredient
      const updatedIngredientsPicked = currentIngredientsPicked.filter(ing => ing !== option)
      setCurrentIngredientsPicked([...updatedIngredientsPicked])
    } else {
      // add ingredient
      setCurrentIngredientsPicked([...currentIngredientsPicked, option])
    }

    handleIngredientPick(categoryName, booleanName, option)
  }

  return (
    <View style={{ height: windowHeight - 100 }}>

      <PageHead title={category.question !== null && category.question} />

      {/* {( currentIngredientsPicked.length !== 0 || state[category.boolean.name] ) && */}
      {state[category.name].length >= 1 &&
        <Link
          to='/inventory'
          onPress={() => setStepsCompleted([...stepsCompleted, category.id])}
          style={styles.validate}
        >
          <Text style={[styles.validateBtn, GlobalStyles.textCenter, GlobalStyles.textBold]}>
            C'est tout
          </Text>
        </Link>
        }

      <View style={styles.ingredientsList}>

        {category.options.map((option, index) => (
          <TouchableOpacity
            onPress={() => handleIngredientPress(category.name, category.boolean.name, option)}
            key={option.value}
            style={styles.ingredient}
            // disabled={ingredientsPicked.includes(option.value)}
          >
              <Image
                source={option.image}
                accessibilityLabel={option.value}
                style={{width: 40, height: 40, marginBottom: 10}}
                tintColor={colorScheme === 'dark' ?
                  userIngredients.includes(option) ? '#251fc1' : 'white' // dark mode
                  : userIngredients.includes(option) ? '#251fc1' : 'black' // light mode
              }
              />

              <Text style={
                userIngredients.includes(option) ?
                [GlobalStyles.smallText, GlobalStyles.textBold, GlobalStyles.textCenter, styles.picked]
                  // { color: colorScheme === 'dark' ? '' : '#251fc1' }]
                : [GlobalStyles.smallText, GlobalStyles.textBold, GlobalStyles.textCenter, { color: 'black' }]
              }
              >
                {option.value}
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
    // height: 75,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
    paddingVertical: 8,
    paddingHorizontal: 4,
    // backgroundColor: '#7B7BCE',
    // borderRadius: 10
  },
  picked: {
    color: '#251fc1'
  },
  validate: {
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 15
  },
  validateBtn: {
    width: 120,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 7,
    // backgroundColor: 'hsl(242, 72%, 44%)',
    backgroundColor: '#0C0A3E',
    color: 'white'
  },
})
