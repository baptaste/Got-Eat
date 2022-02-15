import React from 'react'
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'

export default function Undo({ clearState, colorScheme }) {

  return (
    <TouchableOpacity
      onPress={clearState}
      style={[ GlobalStyles.row, styles.undo ]}
    >
      <Text style={[ GlobalStyles.mediumText, { color: 'black' } ]}>Vider l'inventaire</Text>
      <Image
        source={require('../assets/icons/undo-arrow.png')}
        style={{ width: 25, height: 25, tintColor: colorScheme === 'dark' ? 'white' : 'grey' }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  undo: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: '20%',
    marginTop: 32,
  }
 })