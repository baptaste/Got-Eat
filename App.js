import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Appearance, StatusBar, Dimensions, LogBox } from 'react-native';
import { NativeRouter, Routes, Route } from "react-router-native";
// import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalStyles } from './styles/GlobalStyles';

import Consent from './components/Consent'
import Inventory from './components/Inventory';
import Ingredients from './components/Ingredients';
import Submit from './components/Submit';
import Result from './components/Result';
import Nav from './components/Nav';
import Home from './components/Home';
import Cart from './components/Cart';
import Recipe from './components/Recipe';

import { RecoilRoot } from 'recoil'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { ingredientsState, userIngredientsState, resultState, recipeState } from './store/atoms/globals'
import { colorSchemeState, windowHeightState } from './store/atoms/settings';

export default function RecoilApp() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  )
}

function App() {

  LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  const colorScheme = Appearance.getColorScheme()
  const setColorScheme = useSetRecoilState(colorSchemeState)

  const windowHeight = Dimensions.get('window').height
  const setWindowHeight = useSetRecoilState(windowHeightState)

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key : user consent rules')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log('Error', error);
    }
  }

  useEffect(() => {
    console.log('*** App init ***')
    if (colorScheme === 'dark') {
      console.log('user uses dark mode')
    } else console.log('user uses light mode')

    getData().then((res) => {
      console.log('user consent rules')
      setHasConsent(res)
    })

    setColorScheme(colorScheme)
    setWindowHeight(windowHeight)
  }, [])

  /* // TODO //
     create tutorial instead
  */
  const [isMoreInfoHidden, setIsMoreInfoHidden] = useState(true)
  const [hasConsent, setHasConsent] = useState(false)

  // recoil states
  const [ingredients, setIngredients] = useRecoilState(ingredientsState) // initially named state
  const [userIngredients, setUserIngredients] = useRecoilState(userIngredientsState)
  const result = useRecoilValue(resultState)
  const recipe = useRecoilValue(recipeState)

  // update userIngredients recoil's atom
  const handleIngredientPick = (categoryName, booleanName, ingredient) => {
    if (userIngredients.includes(ingredient)) {
      // remove ingredient
      const updatedUserIngredients = userIngredients.filter(ing => ing !== ingredient)
      setUserIngredients([...updatedUserIngredients])
      console.log('ingredient', ingredient, 'has been removed from users ingredients.', updatedUserIngredients);
    } else {
      // add ingredient
      setUserIngredients([...userIngredients, ingredient])
    }

    dispatchToState(categoryName, booleanName, ingredient)
  }
  // update ingredients recoil's atom
  const dispatchToState = (categoryName, booleanName, value) => {
    const key = categoryName,
          booleanKey = booleanName;

    const isAlreadyInState = ingredients[key].includes(value)

    if (isAlreadyInState) {
      // console.log('MODIFYING // ingredient', value, 'already present in', key);
      const updatedStateKey = ingredients[key].filter(el => el !== value)
      setIngredients({
        ...ingredients,
        [key]: [...updatedStateKey],
        [booleanKey]: updatedStateKey.length >= 1 ? true : !ingredients[booleanKey]
      })
      console.log('***STATE UPDATE*** , ingredient', value, 'removed in', key, updatedStateKey);
    }

    if (!isAlreadyInState) {
      setIngredients({
        ...ingredients,
        [key]: [ ...ingredients[key], value ],
        [booleanKey]: ingredients[key].length >= 1 ? true : !ingredients[booleanKey]
      })

      console.log(
        '***STATE UPDATE***',
        value.value, 'added to:', key, [ ...ingredients[key], value ],
        booleanKey, 'set to:', ingredients[key].length >= 1 ? true : !ingredients[booleanKey]
      );
    }
  }

  return (
    // <LinearGradient
    //     colors={['rgba(0,0,0,1)', 'rgba(37,31,193,1)']}
    //     style={styles.background}
    //   >
      <NativeRouter>
        <ScrollView contentContainerStyle={[styles.container]}>
          <View style={styles.main}>

            <Routes>
              <Route exact path='/'
                element={
                  <>
                    {!hasConsent &&
                      <Consent
                        isMoreInfoHidden={isMoreInfoHidden}
                        setIsMoreInfoHidden={setIsMoreInfoHidden}
                      />
                    }
                    <Home />
                  </>
                }
              />
              <Route exact path='/inventory' element={ <Inventory /> }/>
              <Route exact path='/inventory/ingredients' element={ <Ingredients handleIngredientPick={handleIngredientPick} /> } />
              <Route exact path='/cart' element={ <Cart /> } />
              <Route exact path='/result' element={ <Result /> } />
              <Route exact path='/result/:id' element={ recipe && <Recipe /> } />
            </Routes>

          </View>
          <StatusBar style="auto" />
        </ScrollView>

        {userIngredients.length > 5 && (result === null || result.status === 'Error') &&
          <Submit />
        }

        <View style={styles.footer}>
          <Nav />
        </View>

      </NativeRouter>

    // </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    color: 'black',
    zIndex: -1
  },
  // background: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   height: '100vh'
  // },
  main: {
    width: '100%',
    height: '100%',
    marginTop: 20,
  },
  footer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
