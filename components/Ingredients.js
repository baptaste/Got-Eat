import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link, useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import GoBack from '../components/GoBack'

export default function Ingredients({
  category,
  handleIngredientPick,
  stepsCompleted,
  setStepsCompleted,
  ingredientsPicked,
  setIngredientsPicked,
  colorScheme,
  windowHeight,
  setCurrentLocation
}) {

  const { pathname } = useLocation()
  useEffect(() => {
    setCurrentLocation(pathname)
  }, [])

  const [isPicking, setIsPicking] = useState(false)

  const handleIngredientPress = (categoryName, booleanName, optionValue) => {
    handleIngredientPick(categoryName, booleanName, optionValue)
    setIngredientsPicked([...ingredientsPicked, optionValue])

    const ingredientsData = category.options.map(option => option.value)

    const isIngredientIncluded = ingredientsData.filter(ingredient => ingredientsPicked.includes(ingredient))

    if (isIngredientIncluded) setIsPicking(true)
  }

  return (
    <View style={{ height: windowHeight - 100 }}>

      <GoBack />

      <View style={styles.heading}>

        <Text style={[GlobalStyles.hugeText, GlobalStyles.textCenter, styles.pageTitle]}>
          {category.question}
        </Text>
        {isPicking &&
          <Link
          to='/inventory'
          onPress={() => setStepsCompleted([...stepsCompleted, category.id])}
          style={styles.validate}
        >
          <Text style={[styles.validateBtn, GlobalStyles.textCenter, GlobalStyles.textBold]}>
            {stepsCompleted.includes(category.id) ? "Modifier" : "C'est tout"}
          </Text>
        </Link>
        }
      </View>


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
                  ingredientsPicked.includes(option.value) ? '#251fc1' : 'white' // dark mode
                  : ingredientsPicked.includes(option.value) ? '#251fc1' : 'black' // light mode
              }
              />

              <Text style={
                ingredientsPicked.includes(option.value) ?
                [GlobalStyles.smallText, GlobalStyles.textBold, GlobalStyles.textCenter, styles.picked]
                  // { color: colorScheme === 'dark' ? '' : '#251fc1' }]
                : [GlobalStyles.smallText, GlobalStyles.textBold, GlobalStyles.textCenter]
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
  heading: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  IngredientsList: {
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
