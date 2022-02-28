import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Link, useLocation } from 'react-router-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { resultState, recipeListState } from '../../store/atoms/globals'
import { currentLocationState, colorSchemeState, hasSubmitState } from '../../store/atoms/settings'

import PageHead from '../PageHead'
import ResultArea from './ResultArea'
import RecipeList from './RecipeList'

export default function Result() {

  const { pathname } = useLocation()
  const result = useRecoilValue(resultState)
  // const colorScheme = useRecoilValue(colorSchemeState)
  const setCurrentLocation = useSetRecoilState(currentLocationState)
  const recipesList = useRecoilValue(recipeListState)
  const resetHasSubmit = useResetRecoilState(hasSubmitState)

  useEffect(() => {
    setCurrentLocation(pathname)
    resetHasSubmit()
  }, [])

  return (
    <View style={styles.result}>

      <PageHead title='Recettes' />

      {(result === null && recipesList.length === 0) &&
        <View style={styles.message, { width: '100%', height: 50, position: 'relative' }} >
          <Text style={[GlobalStyles.mediumText, { width: '100%', fontWeight: '300'  }]}>
            Tu n'as pas encore de recettes. Tu peux faire la liste de tes ingrédients dans
          </Text>
          <Link to='/inventory'
            style={{ position: 'absolute', bottom: 7, right: 40 }}>
              <Text
                style={[GlobalStyles.mediumText, GlobalStyles.textBold, GlobalStyles.secondColor]}>
                  Mon Inventaire
                </Text>
            </Link>
        </View>
      }
      {/* TODO // add button to start new inventory */}

      {result !== null && <ResultArea />}
      {recipesList.length !== 0 && <RecipeList />}

    </View>
  )
}

const styles = StyleSheet.create({
  result: {
    flex: 1,
    alignItems: 'center',
  },
})