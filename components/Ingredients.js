import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import Inventory from '../assets/images/inventory-white.png'

export default function Ingredients({ category, handleIngredientPick, stepsCompleted, setStepsCompleted }) {

  const [ingredientsPicked, setIngredientsPicked] = useState([])

  const handleIngredientPress = (categoryName, booleanName, optionValue) => {
    handleIngredientPick(categoryName, booleanName, optionValue)
    setIngredientsPicked([...ingredientsPicked, optionValue])
  }

  return (
    <View style={styles.container}>

      <Link to='/' style={[styles.goBackBtn, GlobalStyles.textCenter]}>
        <Image source={Inventory} style={styles.inventoryIcon}></Image>
      </Link>

      <Text style={[
        GlobalStyles.hugeText,
        GlobalStyles.textCenter,
        styles.pageTitle
        ]}
      >
        {category.question}
      </Text>

      <View style={styles.IngredientsList}>

        {category.options.map(option => (
          <TouchableOpacity
            onPress={() => handleIngredientPress(category.name, category.boolean.name, option.value)}
            key={option.value}
            style={ingredientsPicked.includes(option.value) ? [styles.ingredient, styles.picked] : styles.ingredient}
            disabled={ingredientsPicked.includes(option.value)}
          >
              <Text style={[GlobalStyles.textBold]}>{option.value}</Text>
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
  pageTitle: {
    marginTop: 15,
    marginBottom: 30
  },
  goBackBtn: {
    width: '100%',
  },
  inventoryIcon: {
    width: 40,
    height: 40,
    color: 'red',
    alignSelf: 'flex-end'
  },
  IngredientsList: {
    width: '100%',
    // height: '70%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 30
  },
  ingredient: {
    width: '48%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  picked: {
    backgroundColor: 'grey',
    borderRadius: 10
  },
  validate: {
    width: '50%',
    margin: 'auto'
  },
  validateBtn: {
    display: 'grid',
    placeItems: 'center',
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'hsl(242, 72%, 44%)',
    color: 'white'
  },
})
