import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link, useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import PageHead from '../components/PageHead'

export default function Ingredients({
  category,
  userIngredients,
  handleIngredientPick,
  colorScheme,
  windowHeight,
  setCurrentLocation,
  state
}) {

  const { pathname } = useLocation()

  useEffect(() => {
    setCurrentLocation(pathname)
  }, [])

  return (
    <View style={{ height: windowHeight - 100 }}>

      <PageHead title={category.question !== null && category.question} />

      {state[category.name].length >= 1 &&
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

        {category.options.map((option, index) => (
          <TouchableOpacity
            onPress={() => handleIngredientPick(category.name, category.boolean.name, option)}
            key={option.value}
            style={styles.ingredient}
            // disabled={ingredientsPicked.includes(option.value)}
          >
              <Image
                source={option.image}
                accessibilityLabel={option.value}
                style={{width: 40, height: 40, marginBottom: 10}}
                tintColor={colorScheme === 'dark' ?
                  userIngredients.includes(option) ? GlobalStyles.secondColor.color : 'white' // dark mode
                  : userIngredients.includes(option) ? GlobalStyles.secondColor.color : 'black' // light mode
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
    color: 'white'
  },
})
