import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link, useNavigate } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

import Home from '../assets/icons/home-light.png'
import Recipes from '../assets/icons/recipe-chef.png'
import Inventory from '../assets/icons/shopping-list.png'
import Cart from '../assets/icons/shopping-basket.png'

export default function Nav({ colorScheme, clearState, currentLocation, result }) {
  const routes = [
    { path: '/', icon: Home, name: 'Accueil' },
    { path: '/inventory', icon: Inventory, name: 'Inventaire' },
    { path: '/cart', icon: Cart, name: 'Ingrédients' },
    { path: '/result', icon: Recipes, name: 'Recettes' },
  ]

  return (
    <View style={[styles.nav]}>

      {routes.map(({ path, icon, name }, index) => (
        <Link
          exact to={path}
          key={name + index}
          style={{ height: styles.nav.height, paddingTop: 10 }}
        >
          <View style={styles.navLink} >
            <Image
              source={icon}
              style={{ width: 30, height: 30,
                tintColor: colorScheme === 'dark' ?
                  currentLocation === path ? '#0C0A3E' : 'grey'
                  : currentLocation === path ? '#0C0A3E' : 'grey'
              }}
            />
            <Text style={styles.linkText}>{name}</Text>
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
    justifyContent: 'space-around',
    height: 60,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd'
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
