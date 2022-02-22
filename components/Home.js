import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Link, useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'

import { useSetRecoilState, useRecoilValue } from 'recoil'
import { currentLocationState, colorSchemeState, windowHeightState } from '../store/atoms/settings'

export default function Home() {

  const { pathname } = useLocation()
  const setCurrentLocation = useSetRecoilState(currentLocationState)
  const colorScheme = useRecoilValue(colorSchemeState)
  const windowHeight = useRecoilValue(windowHeightState)

  useEffect(() => {
    setCurrentLocation(pathname)
  }, [])

  return (
    <View style={{ height: windowHeight - 110 }}>

      <Text style={[GlobalStyles.hugeText]}>Bonjour</Text>

      <View style={styles.contentArea}>

        <Link to='/inventory' style={[styles.contentItem, GlobalStyles.secondBg, { shadowColor: colorScheme === 'dark' ? '#ddd' : 'black' }]} >
          <>
            <Text style={[GlobalStyles.bigText, GlobalStyles.whiteText]}>Trouver ma recette</Text>
            <Text style={[GlobalStyles.mediumText, GlobalStyles.whiteText, { width: '80%' }]}>
              Je fais l'inventaire de mes fonds de placard
            </Text>
          </>
        </Link>

        <Link to='/cart' style={[styles.contentItem, GlobalStyles.thirdBg, { shadowColor: colorScheme === 'dark' ? 'grey' : 'black' }]} >
          <>
            <Text style={[GlobalStyles.bigText, GlobalStyles.whiteText]}>Ma liste d'ingrédients</Text>
            <Text style={[GlobalStyles.mediumText, GlobalStyles.whiteText, { width: '80%' }]}>
              Voir ceux présents dans mon inventaire
            </Text>
          </>
        </Link>

        <Link to='/result' style={[styles.contentItem, { backgroundColor: '#212227', shadowColor: colorScheme === 'dark' ? 'grey' : 'black' }]}>
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
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.51,
    // shadowRadius: 15,
    // elevation: 15,
  },
})