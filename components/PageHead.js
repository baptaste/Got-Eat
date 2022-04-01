import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import GoBackBtn from './Buttons/GoBackBtn'

export default function PageHead({ title }) {

  return (
    <View style={styles.head}>
      <GoBackBtn />

      <Text style={[GlobalStyles.hugeText, GlobalStyles.textCenter]}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  head: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
})

