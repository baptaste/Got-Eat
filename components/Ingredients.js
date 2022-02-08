import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import Inventory from '../assets/images/inventory-white.png'

export default function Ingredients({
  category, handleIngredientPick, stepsCompleted, setStepsCompleted, ingredientsPicked, setIngredientsPicked
}) {

  const handleIngredientPress = (categoryName, booleanName, optionValue) => {
    handleIngredientPick(categoryName, booleanName, optionValue)
    setIngredientsPicked([...ingredientsPicked, optionValue])
  }

  return (
    <View style={styles.container}>

      <View style={[GlobalStyles.row, styles.pickerHead]}>
        <Link to='/' style={[styles.goBackBtn, GlobalStyles.textCenter]}>
          <Image
            source={Inventory}
            style={{width: 40, height: 40, alignSelf: 'flex-end'}}
          />
        </Link>
        <Text style={[GlobalStyles.hugeText, GlobalStyles.textCenter, styles.pageTitle]}>
          {category.question}
        </Text>
      </View>

      <View style={styles.IngredientsList}>

        {category.options.map((option, index) => (
          <TouchableOpacity
            onPress={() => handleIngredientPress(category.name, category.boolean.name, option.value)}
            key={option.value}
            style={ingredientsPicked.includes(option.value) ? [styles.ingredient, styles.picked] : styles.ingredient}
            disabled={ingredientsPicked.includes(option.value)}
          >
              <Image
                source={option.image}
                accessibilityLabel={option.value}
                style={{width: 40, height: 40}}
                tintColor={ingredientsPicked.includes(option.value) && '#251fc1'}
              />
              <Text style={ingredientsPicked.includes(option.value) ?
                [GlobalStyles.mediumText, GlobalStyles.textBold, GlobalStyles.textCenter, styles.picked] : [GlobalStyles.mediumText, GlobalStyles.textBold, GlobalStyles.textCenter]}>
                {option.value}
              </Text>
          </TouchableOpacity>
        ))}

      </View>

      <Link
        to='/'
        onPress={() => setStepsCompleted([...stepsCompleted, category.id])}
        style={styles.validate}
      >
        <Text style={[styles.validateBtn, GlobalStyles.textCenter, GlobalStyles.textBold]}>
          {stepsCompleted.includes(category.id) ? "Modifier" : "J'ai que ça en stock"}
        </Text>
      </Link>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    width: '100%',
    height: '100%',
  },
  pickerHead: {
    justifyContent: 'center'
  },
  pageTitle: {
    width: '50%',
    marginTop: 50,
    marginBottom: 30,
  },
  goBackBtn: {
    position: 'relative',
    top: 50,
    left: -50
  },
  IngredientsList: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  ingredient: {
    width: '30%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  picked: {
    color: '#251fc1'
  },
  validate: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50
  },
  validateBtn: {
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'hsl(242, 72%, 44%)',
    color: 'white'
  },
})
