import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Link, useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import CartIcon from '../assets/icons/shopping-basket.png'
import PageHead from '../components/PageHead'
import CartModal from '../components/CartModal'
import Checked from '../assets/icons/checked.png'

export default function Inventory({ dataItems, setCategory, clearState, setCurrentLocation, userIngredients, state, colorScheme }) {

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
          style={[styles.cartButton, GlobalStyles.fourthBg]}
        >
          <Image source={CartIcon} style={{ width: 25, height: 25, tintColor: colorScheme === 'dark' ? GlobalStyles.fourthColor.color : 'black' }} />
          <Text style={[GlobalStyles.mediumText, GlobalStyles.textBold, { color: 'black' }]}>
            {userIngredients.length >= 3 ? (`Ingrédients (${userIngredients.length - 2})`) : ('Ingrédients')}
          </Text>
        </TouchableOpacity>
      }

      {isCartActive &&
        <CartModal
          clearState={clearState}
          userIngredients={userIngredients}
          handleCartButtonPress={handleCartButtonPress}
          colorScheme={colorScheme}
        />
      }

      <View style={styles.inventoryList}>

        {dataItems.map((item, index) => (

          <Link
            onPress={() => setCategory(item)}
            to='/inventory/ingredients'
            key={item.id}
            style={state[item.boolean.name] ?
              [styles.inventoryItem, styles.completed] : [GlobalStyles.secondBg, styles.inventoryItem]}
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
                  style={[styles.checked, GlobalStyles.fithTintColor]}
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
    backgroundColor: GlobalStyles.thirdBg.backgroundColor,
    color: '#525252'
  },
  checked: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 10,
    right: 12,
    zIndex: -1,
  },
  cartButton: {
    width: 180,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    borderRadius: 7,
  }
})