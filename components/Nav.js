import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link, useNavigate } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
// import Inventory from '../assets/images/inventory-white.png'
import Home from '../assets/icons/home-light.png'

export default function Nav({ colorScheme, clearState }) {
  return (
    <View style={[styles.nav]}>
      <Link to='/' style={[styles.goBackBtn, GlobalStyles.textCenter]} onPress={clearState}>
          <Image
            source={Home}
            style={{width: 30, height: 30, alignSelf: 'flex-end', tintColor: colorScheme === 'dark' ? 'white' : 'black'}}
          />
        </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
})
