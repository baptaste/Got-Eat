import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import { formData } from '../data/formData'

export default function Inventory({ setCategory }) {
  const [formItems, setFormItems] = useState(formData)

  return (
    <View style={styles.inventory}>

      <Text style={[GlobalStyles.text, GlobalStyles.hugeText, GlobalStyles.textCenter]}>Mon inventaire</Text>

      <View style={styles.inventoryList}>

        {formItems.map(item => (
          <Link
            onPress={() => setCategory(item)}
            to={`/ingredients/${item.id}`}
            key={item.id}
            style={[styles.inventoryItem]}
          >
            <Text
              style={[
                GlobalStyles.whiteText,
                GlobalStyles.mediumText,
                GlobalStyles.textBold,
                GlobalStyles.textCenter
              ]}
            >
              {item.label}
            </Text>
          </Link>
        ))}

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  inventory: {
    flex: 1
  },
  inventoryList: {
    width: '100%',
    height: '100%',
    // flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 'auto',
    marginTop: 30,
  },
  inventoryItem: {
    display: 'grid',
    placeItems: 'center',
    width: '48%',
    height: 150,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#0C0A3E',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.51,
    shadowRadius: 10,
    elevation: 15,
  },
})