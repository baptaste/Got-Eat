import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import Inventory from '../assets/images/inventory-white.png'

export default function Ingredients({category}) {
  return (
    <View style={styles.container}>

      <Link to='/' style={[styles.goBackBtn, GlobalStyles.textCenter]}>
        <Image source={Inventory} style={styles.inventoryIcon}></Image>
        {/* <Text style={[GlobalStyles.mediumText, GlobalStyles.whiteText]}>Inventaire</Text> */}
      </Link>

      <Text style={[
        GlobalStyles.hugeText,
        GlobalStyles.textCenter,
        styles.pageTitle
        ]}
      >
        {category.question}
      </Text>

      <View style={styles.IngredientsList}>

        {category.options.map(option => (
          <TouchableOpacity
            key={option.value}
            style={styles.ingredient}
          >
              <Text style={[GlobalStyles.textBold]}>{option.value}</Text>
          </TouchableOpacity>
        ))}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    width: '100%',
    height: '100%',
  },
  pageTitle: {
    marginTop: 15,
    marginBottom: 30
  },
  goBackBtn: {
    width: '100%',
  },
  inventoryIcon: {
    width: 40,
    height: 40,
    color: 'red',
    alignSelf: 'flex-end'
  },
  IngredientsList: {
    width: '100%',
    // height: '70%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 30
  },
  ingredient: {
    width: '48%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'grey'
  },
})
