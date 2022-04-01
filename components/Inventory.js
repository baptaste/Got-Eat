import React, { useState, useEffect, Suspense } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, LogBox } from 'react-native'
import { Link, useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

import PageHead from '../components/PageHead'
import CartModal from '../components/CartModal'

import CartIcon from '../assets/icons/shopping-basket.png'
import Checked from '../assets/icons/checked.png'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { dataItemsState, categoryState, ingredientsState, userIngredientsState } from '../store/atoms/globals'
import { currentLocationState, colorSchemeState, windowHeightState } from '../store/atoms/settings'
import { categoryListQueryState } from '../store/selectors/getRequests'
import axios from 'axios'

export default function Inventory({ clearState }) {

  LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  const { pathname } = useLocation()
  const setCurrentLocation = useSetRecoilState(currentLocationState)

  const $colorScheme = useRecoilValue(colorSchemeState)
  const $windowHeight = useRecoilValue(windowHeightState)

  const [isCartActive, setIsCartActive] = useState(false)
  const handleCartButtonPress = () => setIsCartActive(!isCartActive)

  const $ingredients = useRecoilValue(ingredientsState)
  const $userIngredients = useRecoilValue(userIngredientsState)

  const setCategory = useSetRecoilState(categoryState)

  const handleCategoryPress = (category) => {
    setCategory(category)
  }

  const $categoryList = useRecoilValue(categoryListQueryState)

  useEffect(() => {
    setCurrentLocation(pathname)
  }, [])

  return (
    <View style={[styles.inventory, { minHeight: $windowHeight }]}>

      <PageHead title='Mon inventaire' />

      {!isCartActive &&
        <TouchableOpacity
          onPress={handleCartButtonPress}
          style={[styles.cartButton]}
        >
          <Image source={CartIcon}
            style={{ width: 25, height: 25, tintColor: $colorScheme === 'dark' ? GlobalStyles.fourthColor.color : GlobalStyles.secondColor.color }}
          />
          <Text style={[GlobalStyles.mediumText, GlobalStyles.textBold, { color: GlobalStyles.secondColor.color } ]}>
            {$userIngredients.length >= 3 ? (`Ingrédients (${$userIngredients.length - 2})`) : ('Ingrédients')}
          </Text>
        </TouchableOpacity>
      }

      {isCartActive &&
        <CartModal
          clearState={clearState}
          $userIngredients={$userIngredients}
          handleCartButtonPress={handleCartButtonPress}
          $colorScheme={$colorScheme}
        />
      }

      <View style={styles.inventoryList}>

        {$categoryList.map((category, index) => (

          <Link
            onPress={() => handleCategoryPress(category)}
            to='/inventory/ingredients'
            key={category._id}
            style={$ingredients[category.boolean] ?
              [styles.inventoryItem, styles.completed] : [GlobalStyles.fourthBg, styles.inventoryItem]}
          >
            <>
              <Text
                style={$ingredients[category.boolean] ?
                [ styles.completed,
                  GlobalStyles.mediumText,
                  GlobalStyles.textBold,
                  GlobalStyles.textCenter, { backgroundColor: 'transparent' }
                ] : [
                  GlobalStyles.mainColorDark,
                  GlobalStyles.mediumText,
                  GlobalStyles.textBold,
                  GlobalStyles.textCenter, { backgroundColor: 'transparent' }
                ]}
              >
                {category.title}
              </Text>
              {$ingredients[category.boolean] &&
                <Image
                  source={Checked}
                  style={[styles.checked, GlobalStyles.sixthTintColor]}
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
    // height: '100%',
    marginBottom: 50
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
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.51,
    // shadowRadius: 10,
    // elevation: 15,
  },
  completed: {
    // backgroundColor: GlobalStyles.thirdBg.backgroundColor,
    backgroundColor: GlobalStyles.mainBgDark.backgroundColor,
    color: '#525252'
    // color: '#70877F'
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
    borderRadius: 90,
    backgroundColor: GlobalStyles.fifthBg.backgroundColor
  }
})