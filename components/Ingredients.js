import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

export default function Ingredients({
  category,
  handleIngredientPick,
  stepsCompleted,
  setStepsCompleted,
  ingredientsPicked,
  setIngredientsPicked,
  colorScheme
}) {

  const [isPicking, setIsPicking] = useState(false)

  const handleIngredientPress = (categoryName, booleanName, optionValue) => {
    handleIngredientPick(categoryName, booleanName, optionValue)
    setIngredientsPicked([...ingredientsPicked, optionValue])

    const ingredientsData = category.options.map(option => option.value)

    const isIngredientIncluded = ingredientsData.filter(ingredient => ingredientsPicked.includes(ingredient))
    // console.log('isIngredientIncluded :', isIngredientIncluded);

    if (isIngredientIncluded) setIsPicking(true)
  }



  return (
    <View style={{ height: '100%' }}>

      <Text style={[GlobalStyles.hugeText, GlobalStyles.textCenter, styles.pageTitle]}>
        {category.question}
      </Text>

      {isPicking &&
        <Link
        to='/'
        onPress={() => setStepsCompleted([...stepsCompleted, category.id])}
        style={styles.validate}
      >
        <Text style={[styles.validateBtn, GlobalStyles.textCenter, GlobalStyles.textBold]}>
          {stepsCompleted.includes(category.id) ? "Modifier" : `J'ai que ça en ${category.label.toLowerCase()}`}
        </Text>
      </Link>
      }

      <View style={styles.IngredientsList}>

        {category.options.map((option, index) => (
          <TouchableOpacity
            onPress={() => handleIngredientPress(category.name, category.boolean.name, option.value)}
            key={option.value}
            style={styles.ingredient}
            disabled={ingredientsPicked.includes(option.value)}
          >
              <Image
                source={option.image}
                accessibilityLabel={option.value}
                style={{width: 40, height: 40, marginBottom: 10}}
                tintColor={colorScheme === 'dark' ?
                  ingredientsPicked.includes(option.value) ? 'hsl(134, 64%, 29%)' : 'white' // dark mode
                  : ingredientsPicked.includes(option.value) ? '#251fc1' : 'black' // light mode
              }
              />

              <Text style={
                ingredientsPicked.includes(option.value) ?
                [GlobalStyles.mediumText, GlobalStyles.textBold, GlobalStyles.textCenter, styles.picked,
                  { color: colorScheme === 'dark' ? 'hsl(134, 64%, 29%)' : '#251fc1' }]
                : [GlobalStyles.mediumText, GlobalStyles.textBold, GlobalStyles.textCenter]
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
  // ingredients: {
  //   flex: 5,
  //   justifyContent: 'space-between',
  //   // flex: 5,
  //   // width: '100%',
  //   // height: 700,
  //   backgroundColor: 'salmon'
  // },
  // pickerHead: {
  //   width: '100%',
  // },
  pageTitle: {
    width: '100%',
    marginBottom: 30,
    textAlign: 'left',

  },
  IngredientsList: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 16
  },
  ingredient: {
    width: '33%',
    // height: 75,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingVertical: 8,
    paddingHorizontal: 4,
    // backgroundColor: '#7B7BCE',
    // borderRadius: 10
  },
  validate: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
