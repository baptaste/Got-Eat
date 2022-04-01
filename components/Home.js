import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Link, useLocation } from 'react-router-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import axios from 'axios'

import { useSetRecoilState, useRecoilValue } from 'recoil'
import { currentLocationState, colorSchemeState, windowHeightState } from '../store/atoms/settings'

export default function Home() {

  const { pathname } = useLocation()
  const setCurrentLocation = useSetRecoilState(currentLocationState)
  const $colorScheme = useRecoilValue(colorSchemeState)
  const windowHeight = useRecoilValue(windowHeightState)

  useEffect(() => {
    setCurrentLocation(pathname)
  }, [])

  return (

    <View>

      <View style={styles.appName}>
        <Text style={[{ fontSize: 30, fontWeight: '700', color: GlobalStyles.secondColor.color }]}>
          Got Eat
        </Text>
        <Text style={[styles.slogan, GlobalStyles.mediumText, { color: GlobalStyles.mainColorDark.color }]}>
           Cook it
        </Text>
      </View>

      <View style={styles.contentArea}>

        <Link to='/inventory' style={[styles.contentItem, GlobalStyles.secondBg, { shadowColor: $colorScheme === 'dark' ? '#ddd' : 'black' }]} >
          <>
            <Text style={[GlobalStyles.bigText, { color: '#252627' }]}>Trouver ma recette</Text>
            <Text style={[GlobalStyles.mediumText, { width: '80%', color: '#252627' }]}>
              Je fais l'inventaire de mes fonds de placard
            </Text>
          </>
        </Link>

        <Link to='/cart' style={[styles.contentItem, GlobalStyles.fourthBg, { shadowColor: $colorScheme === 'dark' ? 'grey' : 'black' }]} >
          <>
            <Text style={[GlobalStyles.bigText, { color: '#252627' }]}>Ma liste d'ingrédients</Text>
            <Text style={[GlobalStyles.mediumText, { width: '80%' }]}>
              Voir ceux présents dans mon inventaire
            </Text>
          </>
        </Link>

        <Link to='/result' style={[styles.contentItem,
          { backgroundColor: $colorScheme === 'dark' ? '' : GlobalStyles.mainBgDark.backgroundColor, shadowColor: $colorScheme === 'dark' ? 'grey' : 'black' }]}>
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
  appName: {
    height: 60,
    position: 'relative',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  slogan: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    alignSelf: 'flex-end',
    fontStyle: 'italic',
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  contentArea: {
    // width: '100%',
    // height: '100%',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 32,

    // backgroundColor: 'salmon'
  },
  contentItem: {
    width: '100%',
    height: '23%',
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