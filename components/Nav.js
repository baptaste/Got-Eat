import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

import Home from '../assets/icons/home-light.png'
import Recipes from '../assets/icons/recipe-chef.png'
import Inventory from '../assets/icons/shopping-list.png'
import Cart from '../assets/icons/shopping-basket.png'
// import Blocks from '../assets/icons/squares-2.png'

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
          style={{ height: styles.nav.height, width: '20%', paddingTop: 10 }}
        >
          <View style={styles.navLink} >
            <Image
              source={icon}
              style={{ width: 25, height: 25, tintColor: currentLocation === path ? GlobalStyles.secondColor.color : 'grey'
                // tintColor: colorScheme === 'dark' ?
                //   currentLocation === path ? GlobalStyles.secondColor.color : 'grey'
                //   : currentLocation === path ? GlobalStyles.thirdColor.color : 'grey'
              }}
            />
            <Text style={[styles.linkText,
              { fontWeight: currentLocation === path ? 'bold' : 'normal' },
              { color: currentLocation === path ?
                colorScheme === 'dark' ? 'white' : GlobalStyles.mainColorDark.color
                : 'grey' }, ]}
              // { color: colorScheme === 'dark' ?
              //   currentLocation === path ? GlobalStyles.secondColor.color : 'grey'
              //   : currentLocation === path ? GlobalStyles.thirdColor.color : 'grey'
              // }
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
    // paddingHorizontal: 20,
    borderTopWidth: 0.5,
    borderTopColor: GlobalStyles.fourthBg.backgroundColor
  },
  navLink: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  linkText: {
    fontSize: 11,
    color: 'grey'
  },
})
