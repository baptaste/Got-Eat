import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

export default function DefaultBtn({ action, text }) {

  return (
    <TouchableOpacity
      onPress={action}
      style={[styles.defaultBtn]}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  defaultBtn: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginVertical: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: GlobalStyles.mainBgDark.backgroundColor
  }
})
