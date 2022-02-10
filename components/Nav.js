import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link, useNavigate } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

import Home from '../assets/icons/home-light.png'
import Recipes from '../assets/icons/recipe-chef.png'
import Inventory from '../assets/icons/shopping-list.png'

export default function Nav({ colorScheme, clearState, currentLocation, result }) {
  const routes = [
    { path: '/', icon: Home, name: 'Accueil' },
    { path: '/inventory', icon: Inventory, name: 'Inventaire' },
    { path: '/result', icon: Recipes, name: 'Recettes' },
  ]
  return (
    <View style={[styles.nav]}>

    {routes.map(({ path, icon, name }, index) => (
      <View key={name + index} style={styles.navLink}>
        <Link exact to={path} onPress={path === '/' && clearState}>
          <Image
            source={icon}
            style={{ width: 30, height: 30, alignSelf: 'flex-end',
              tintColor: colorScheme === 'dark' ?
                currentLocation === path ? '#0C0A3E' : 'grey'
                : currentLocation === path ? '#0C0A3E' : 'grey'
            }}
          />
        </Link>
        <Text style={styles.linkText}>{name}</Text>
      </View>
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
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  navLink: {
    alignItems: 'center'
  },
  linkText: {
    fontSize: 11,
    color: 'grey'
  },
})
