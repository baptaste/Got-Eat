import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

import Home from '../assets/icons/home-light.png'
import Recipes from '../assets/icons/recipe-chef.png'
import Inventory from '../assets/icons/shopping-list.png'
import Cart from '../assets/icons/shopping-basket.png'

import { useRecoilValue } from 'recoil'
import { currentLocationState, colorSchemeState } from '../store/atoms/settings'

export default function Nav() {

  const routes = [
    { path: '/', icon: Home, name: 'Accueil' },
    { path: '/inventory', icon: Inventory, name: 'Inventaire' },
    { path: '/cart', icon: Cart, name: 'Ingrédients' },
    { path: '/result', icon: Recipes, name: 'Recettes' },
  ]

  const currentLocation = useRecoilValue(currentLocationState)
  const colorScheme = useRecoilValue(colorSchemeState)

  return (
    <View style={[styles.nav,
      { backgroundColor: colorScheme === 'dark' ? GlobalStyles.mainBgDark.backgroundColor : GlobalStyles.mainBgLight.backgroundColor }]}
    >
      {routes.map(({ path, icon, name }, index) => (
        <Link
          exact to={path}
          key={name + index}
          style={{ height: styles.nav.height, paddingTop: 10 }}
        >
          <View style={styles.navLink} >
            <Image
              source={icon}
              style={{ width: 30, height: 30, tintColor: currentLocation === path ? GlobalStyles.secondColor.color : 'grey'
                // tintColor: colorScheme === 'dark' ?
                //   currentLocation === path ? GlobalStyles.secondColor.color : 'grey'
                //   : currentLocation === path ? GlobalStyles.thirdColor.color : 'grey'
              }}
            />
            <Text style={[styles.linkText, { color: currentLocation === path ? GlobalStyles.secondColor.color : 'grey' }
              // { color: colorScheme === 'dark' ?
              //   currentLocation === path ? GlobalStyles.secondColor.color : 'grey'
              //   : currentLocation === path ? GlobalStyles.thirdColor.color : 'grey'
              // }
            ]}
            >
              {name}
            </Text>
          </View>
        </Link>
      ))}

    </View>
  )
}

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.fourthBg.backgroundColor
  },
  navLink: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  linkText: {
    fontSize: 11,
    color: 'grey'
  },
})
