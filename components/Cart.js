import React, { useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import PageHead from '../components/PageHead'
import Undo from '../components/Undo'
import Close from '../assets/icons/cancel.png'

export default function Cart({ setCurrentLocation, clearState, userIngredients, handleCartButtonPress, colorScheme }) {

  const { pathname } = useLocation()

  useEffect(() => {
    setCurrentLocation(pathname)
  }, [])

  return (

    pathname === '/cart' ? (
      <View style={styles.cartScreen}>
        <PageHead title='Mes ingrédients' />

        <Text style={[GlobalStyles.bigText, GlobalStyles.textBold, { marginVertical: 16 }]}>
          {userIngredients.length >= 3 ?
            `${userIngredients.length - 2} ${(userIngredients.length - 2) > 1 ? 'sélectionnés' : 'sélectionné'}`
            : 'Ingrédients de base'
          }
        </Text>

        <View style={[styles.ingredientsList, { justifyContent: userIngredients.length >= 3 ? 'space-between' : 'flex-start' }]}>
          {userIngredients.map(ingredient => (
            <View
              key={ingredient.value}
              style={styles.ingredient}
            >
              <Image
                source={ingredient.image}
                accessibilityLabel={ingredient.value}
                style={{ width: 40, height: 40, marginBottom: 10 }}
                tintColor={colorScheme === 'dark' ? 'black' : 'white'}
              />
              <Text style={[GlobalStyles.smallText, GlobalStyles.textBold, GlobalStyles.textCenter, { color: 'white' }]}>
                {ingredient.value}
              </Text>
            </View>
          ))}
        </View>

        {userIngredients.length >= 3 &&
          <Undo clearState={clearState} colorScheme={colorScheme}
        />}
      </View>
    ) : (
    /* MODAL in /inventory */
    <View style={styles.cartBlock}>

      <Text style={[ GlobalStyles.bigText, GlobalStyles.textBold ]}>
        {userIngredients.length >= 3 ?
          `${userIngredients.length - 2} ${(userIngredients.length - 2) > 1 ? 'sélectionnés' : 'sélectionné'}`
          : 'Ingrédients de base'
        }
      </Text>

      <View style={[GlobalStyles.row, styles.cartList]}>
        {userIngredients.map((ingredient, index) =>
          <Text
            key={ingredient.value}
            style={[
              GlobalStyles.textBold, GlobalStyles.whiteText,
              { paddingHorizontal: 10, paddingVertical: 5, marginRight: 5, marginBottom: 5,
                backgroundColor: index < 2 ? '#0C0A3E' : 'hsl(242, 72%, 44%)', borderRadius: 7 }
              ]}
          >
            {ingredient.value.charAt(0).toUpperCase() + ingredient.value.slice(1)}
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={handleCartButtonPress}
        style={styles.close}
      >
        <Image source={Close} style={{  width: 20, height: 20, tintColor: '#2e2e2e' }} />
      </TouchableOpacity>

      {userIngredients.length >= 3 &&
        <Undo clearState={clearState} colorScheme={colorScheme}
      />}

    </View>
    )
  )
}

const styles = StyleSheet.create({
  ingredientsList: {
    width: '100%',
    // height: '85%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: '#0C0A3E',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.51,
    shadowRadius: 10,
    elevation: 15
  },
  ingredient: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cartBlock: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#ddd',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.51,
    shadowRadius: 10,
    elevation: 15
  },
  cartList: {
    flexWrap: 'wrap',
    marginTop: 16,
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10
  }
})
