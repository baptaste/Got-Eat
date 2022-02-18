import React from 'react'
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'

export default function Undo({ clearState, colorScheme, marginTop }) {

  return (
    <TouchableOpacity
      onPress={clearState}
      style={[ GlobalStyles.row, styles.undo, { marginTop: marginTop } ]}
    >
      <Text style={[ GlobalStyles.mediumText, { color: colorScheme === 'dark' ? GlobalStyles.fourthColor.color : 'grey' } ]}>
        Vider l'inventaire
      </Text>
      <Image
        source={require('../assets/icons/undo-arrow.png')}
        style={{ width: 20, height: 20, tintColor: colorScheme === 'dark' ? GlobalStyles.fourthColor.color : 'grey' }}
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
  }
 })