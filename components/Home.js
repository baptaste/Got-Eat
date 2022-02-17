import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

export default function Home({ windowHeight, colorScheme }) {

  return (
    <View style={{ height: windowHeight - 110 }}>

      <Text style={[GlobalStyles.hugeText]}>Bonjour</Text>

      <View style={styles.contentArea}>

        <Link to='/inventory' style={[styles.contentItem, GlobalStyles.secondBg]} >
          <>
            <Text style={[GlobalStyles.bigText, GlobalStyles.whiteText]}>Trouver ma recette</Text>
            <Text style={[GlobalStyles.mediumText, GlobalStyles.whiteText, { width: '80%' }]}>
              Je fais l'inventaire de mes fonds de placard
            </Text>
          </>
        </Link>

        <Link to='/cart' style={[styles.contentItem, { backgroundColor: 'white' }]} >
          <>
            <Text style={[GlobalStyles.bigText, GlobalStyles.thirdColor]}>Ma liste d'ingrédients</Text>
            <Text style={[GlobalStyles.mediumText, GlobalStyles.thirdColor, { width: '80%' }]}>
              Voir ceux présents dans mon inventaire
            </Text>
          </>
        </Link>

        <Link to='/result' style={[styles.contentItem, GlobalStyles.thirdBg]}>
          <>
            <Text style={[GlobalStyles.bigText, GlobalStyles.whiteText]}>Mon carnet perso</Text>
            <Text style={[GlobalStyles.mediumText, GlobalStyles.whiteText, { width: '80%' }]}>
              Voir mes recettes
            </Text>
          </>
        </Link>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  contentArea: {
    // width: '100%',
    // height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 32,
    // backgroundColor: 'salmon'
  },
  contentItem: {
    width: '100%',
    height: '30%',
    // flex: 1,
    justifyContent: 'space-around',
    // borderWidth: 2,
    // borderColor: 'grey',
    borderRadius: 15,
    // borderWidth: 3,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.51,
    shadowRadius: 15,
    elevation: 15,
  },
})