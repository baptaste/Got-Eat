import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

export default function DefaultLink({ action, path, text, width, marginHor, textColor }) {
  return (
      <Link to={path} onPress={action} style={[styles.defaultLink, { width, margin: marginHor }]}>
        <Text style={{ color: 'black' }}>{text}</Text>
      </Link>
  )
}

const styles = StyleSheet.create({
  defaultLink: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginVertical: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: GlobalStyles.secondBg.backgroundColor
  }
})