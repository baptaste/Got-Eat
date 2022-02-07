import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import { formData } from '../data'

export default function Inventory({ setCategory, stepsCompleted }) {
  const [formItems, setFormItems] = useState(formData)

  return (
    <View style={styles.inventory}>

      <Text style={[GlobalStyles.text, GlobalStyles.hugeText, GlobalStyles.textCenter]}>Mon inventaire</Text>

      <View style={styles.inventoryList}>

        {formItems.map((item, index) => (
          <Link
            onPress={() => setCategory(item)}
            to={`/ingredients/${item.id}`}
            key={item.id}
            style={stepsCompleted.includes(item.id) ? [styles.inventoryItem, styles.completed] : styles.inventoryItem}
          >
            <Text
              style={stepsCompleted.includes(item.id) ?
                [styles.completed,
                GlobalStyles.mediumText,
                GlobalStyles.textBold,
                GlobalStyles.textCenter]
                : [
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

      {/* <TouchableOpacity style={styles.submit}>
        <Text style={[styles.submitBtn, GlobalStyles.bigText]}>J'ai faim</Text>
      </TouchableOpacity> */}

    </View>
  )
}

const styles = StyleSheet.create({
  inventory: {
    flex: 1,
    height: '100%'
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
    marginBottom: 5,
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
  completed: {
    // backgroundColor: 'hsl(158, 100%, 20%)' // jade
    // backgroundColor: 'hsl(140, 52%, 25%' // emerald
    backgroundColor: 'hsl(134, 64%, 29%)', // deep emerald
    color: 'darkgrey'
    // filter: 'grayscale(.3)'
  },
  // submit: {
  //   width: '50%',
  //   margin: 'auto'
  // },
  // submitBtn: {
  //   display: 'grid',
  //   placeItems: 'center',
  //   width: 200,
  //   height: 200,
  //   // marginBottom: 30,
  //   // paddingVertical: 10,
  //   // paddingHorizontal: 20,
  //   borderRadius: '50%',
  //   backgroundColor: 'hsl(242, 72%, 44%)',
  //   color: 'white'
  // }
})