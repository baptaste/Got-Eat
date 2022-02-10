import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

import { Link, useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import Inventory from '../assets/icons/shopping-list.png'
import Recipes from '../assets/icons/recipe-chef.png'
import RightArrow from '../assets/icons/right-arrow.png'

export default function Home({ windowHeight, colorScheme }) {

  return (
    <View style={{ height: windowHeight - 110 }}>
      <Text style={[GlobalStyles.hugeText]}>Bonjour</Text>

      <View style={styles.contentArea}>

        <View style={styles.contentItem}>
          <Text style={[GlobalStyles.bigText, GlobalStyles.whiteText]}>Mon inventaire</Text>
          <Link to='/inventory' style={{ marginTop: 20 }}>
            <Image
              source={Inventory}
              style={{width: 50, alignSelf: 'flex-start', tintColor: 'white', resizeMode: 'contain' }}
            />
          </Link>
          <Image source={RightArrow} style={{width: 25, alignSelf: 'flex-end', tintColor: 'white', resizeMode: 'contain' }} />
        </View>

        <View style={styles.contentItem}>
          <Text style={[GlobalStyles.bigText, GlobalStyles.whiteText]}>Mes recettes</Text>
          <Link to='/result' style={{ alignSelf: 'flex-start' }}>
            <Image
              source={Recipes}
              style={{width: 50, alignSelf: 'flex-start', tintColor: 'white', resizeMode: 'contain'}}
            />
          </Link>
          <Image source={RightArrow} style={{width: 25, alignSelf: 'flex-end', tintColor: 'white', resizeMode: 'contain' }} />
        </View>



      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentArea: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 32
  },
  contentItem: {
    width: '100%',
    height: '25%',
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 15,
    padding: 20,
    marginBottom: 22,
    backgroundColor: '#0C0A3E',
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})