import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import { formData } from '../data'
import Checked from '../assets/icons/check.png'

export default function Inventory({ setCategory, stepsCompleted, colorScheme }) {
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
            style={
              stepsCompleted.includes(item.id) ?
              [styles.inventoryItem, styles.completed] // true => grey background
              : [styles.inventoryItem, {
                backgroundColor: colorScheme === 'dark' ? 'hsl(242, 72%, 44%)' : '#0C0A3E'
              }]
            }
          >
            <>
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
              {stepsCompleted.includes(item.id) &&
                <Image
                  source={Checked}
                  style={styles.checked}
                />
              }
            </>
          </Link>
        ))}

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  inventory: {
    flex: 5,
    height: '100%',
  },
  inventoryList: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 'auto',
    marginTop: 30,
  },
  inventoryItem: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 150,
    marginBottom: 15,
    padding: 10,
    // backgroundColor: '#0C0A3E',
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
    // backgroundColor: 'hsl(134, 64%, 29%)', // deep emerald
    // color: 'darkgrey'
    backgroundColor: '#2b2b2b',
    color: '#525252'
  },
  checked: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 10,
    right: 10,
    tintColor: 'hsl(134, 64%, 29%)',
    zIndex: -1
  }
})