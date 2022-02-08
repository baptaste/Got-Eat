import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles';

export default function Head() {
  return (
    <View style={styles.head}>
      <Link to='/'>
        <Text style={[GlobalStyles.bigText]}>WasteIT</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  head: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
