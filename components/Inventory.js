import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Link, useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import CartIcon from '../assets/icons/shopping-basket.png'
import PageHead from '../components/PageHead'
import Cart from '../components/Cart'
import Checked from '../assets/icons/checked.png'

export default function Inventory({ formItems, setCategory, clearState, stepsCompleted, setCurrentLocation, userIngredients, state }) {

  const { pathname } = useLocation()

  const [isCartActive, setIsCartActive] = useState(false)
  const handleCartButtonPress = () => setIsCartActive(!isCartActive)

  useEffect(() => {
    setCurrentLocation(pathname)
  }, [])

  return (
    <View style={styles.inventory}>

      <PageHead title='Mon inventaire' />

      {!isCartActive &&
        <TouchableOpacity
          onPress={handleCartButtonPress}
          style={styles.cartButton}
        >
          <Image source={CartIcon} style={{ width: 25, height: 25 }} />
          <Text style={[GlobalStyles.mediumText, GlobalStyles.textBold, { color: 'black' }]}>
            {userIngredients.length >= 3 ? (`Ingrédients (${userIngredients.length - 2})`) : ('Ingrédients')}
          </Text>
        </TouchableOpacity>
      }

      {isCartActive &&
        <Cart
          setCurrentLocation={setCurrentLocation}
          clearState={clearState}
          userIngredients={userIngredients}
          handleCartButtonPress={handleCartButtonPress}
        />
      }

      <View style={styles.inventoryList}>

        {formItems.map((item, index) => (

          <Link
            onPress={() => setCategory(item)}
            to='/inventory/ingredients'
            key={item.id}
            style={state[item.boolean.name] ? [styles.inventoryItem, styles.completed] : styles.inventoryItem}
          >
            <>
              <Text
                style={state[item.boolean.name] ?
                [ styles.completed,
                  GlobalStyles.mediumText,
                  GlobalStyles.textBold,
                  GlobalStyles.textCenter, { backgroundColor: 'transparent' }
                ] : [
                  GlobalStyles.whiteText,
                  GlobalStyles.mediumText,
                  GlobalStyles.textBold,
                  GlobalStyles.textCenter, { backgroundColor: 'transparent' }
                ]}
              >
                {item.label}
              </Text>
              {state[item.boolean.name] &&
                <Image
                  source={Checked}
                  style={styles.checked}
                />
              }
            </>
          </Link>
        ))}

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  inventory: {
    flex: 5,
    height: '100%',
  },
  inventoryList: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 'auto',
    marginTop: 30,
  },
  inventoryItem: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 150,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#0C0A3E',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.51,
    shadowRadius: 10,
    elevation: 15,
  },
  completed: {
    // backgroundColor: 'hsl(158, 100%, 20%)' // jade
    // backgroundColor: 'hsl(140, 52%, 25%)' // emerald
    // backgroundColor: 'hsl(134, 64%, 29%)', // deep emerald
    backgroundColor: 'hsl(242, 72%, 6%)',
    color: '#525252'
  },
  checked: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 10,
    right: 12,
    // tintColor: 'hsl(242, 72%, 44%)', // blue
    tintColor: 'hsl(134, 64%, 29%)', // deep emerald
    zIndex: -1,
  },
  cartButton: {
    width: 180,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    borderRadius: 7,
  }
})