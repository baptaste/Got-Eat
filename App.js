import React, { useState, useEffect, Suspense } from 'react'
import { StyleSheet, View, Text, ScrollView, Appearance, StatusBar, Dimensions, LogBox } from 'react-native';
import { NativeRouter, Routes, Route } from "react-router-native";
// import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalStyles } from './styles/GlobalStyles';

import Consent from './components/Consent'
import Inventory from './components/Inventory';
import Ingredients from './components/Ingredients';
import Submit from './components/Buttons/Submit';
import Result from './components/Result';
import Nav from './components/Nav';
import Home from './components/Home';
import Cart from './components/Cart';
import Recipe from './components/Recipe';
import AddMore from './components/Buttons/AddMore';

import { RecoilRoot } from 'recoil'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { ingredientsState, userIngredientsState, resultState, currentRecipeState, ingredientsPickedState, categoryState } from './store/atoms/globals'
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
  const [totalIngredientsPicked, setTotalIngredientsPicked] = useRecoilState(ingredientsPickedState)

  const result = useRecoilValue(resultState)
  const recipe = useRecoilValue(currentRecipeState)
  const category = useRecoilValue(categoryState)
  // const isLoading = useRecoilValue(isLoadingState)

  // update userIngredients recoil's atom
  const handleIngredientPick = (categoryName, booleanName, ingredient) => {
    if (userIngredients.includes(ingredient)) {
      // remove ingredient
      const updatedUserIngredients = userIngredients.filter(ing => ing !== ingredient)
      setUserIngredients([...updatedUserIngredients])
      setTotalIngredientsPicked((n) => n - 1)
      console.log('ingredient', ingredient.value, 'has been removed from users ingredients.', updatedUserIngredients);
    } else {
      // add ingredient
      setUserIngredients([...userIngredients, ingredient])
      setTotalIngredientsPicked((n) => n + 1)
      console.log(`ingredient ${ingredient.value} added to userIngredients`);
    }

    dispatchToState(categoryName, booleanName, ingredient)
  }
  // update ingredients recoil's atom
  const dispatchToState = (categoryName, booleanName, ingredient) => {
    console.log('App // booleanName :', booleanName);

    const key = categoryName,
          booleanKey = booleanName;

    const isAlreadyInState = ingredients[key].includes(ingredient)

    if (isAlreadyInState) {
      // console.log('MODIFYING // ingredient', ingredient, 'already present in', key);
      const updatedStateKey = ingredients[key].filter(el => el !== ingredient)
      console.log('App // updatedStateKey :', updatedStateKey);
      setIngredients({
        ...ingredients,
        [key]: [...updatedStateKey],
        [booleanKey]: updatedStateKey.length >= 1 ? true : !ingredients[booleanKey]
      })
      console.log('***STATE UPDATE***',
        'ingredient', ingredient.value, 'removed in', key,
        booleanKey, 'set to:', updatedStateKey.length >= 1 ? true : !ingredients[booleanKey]
      );
    }

    if (!isAlreadyInState) {
      setIngredients({
        ...ingredients,
        [key]: [ ...ingredients[key], ingredient ],
        [booleanKey]: ingredients[key].length >= 1 ? true : !ingredients[booleanKey]
      })

      console.log('***STATE UPDATE***',
        ingredient.value, 'added to:', key, [ ...ingredients[key], ingredient ],
        booleanKey, 'set to:', ingredients[key].length >= 1 ? true : !ingredients[booleanKey]
      );
    }
  }

  useEffect(() => {
    console.log('ingredientsState :', ingredients);
  }, [ingredients])

  return (
    // <LinearGradient
    //     colors={['rgba(0,0,0,1)', 'rgba(37,31,193,1)']}
    //     style={styles.background}
    //   >

      <NativeRouter>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { backgroundColor: colorScheme === 'dark' ? GlobalStyles.mainBgDark.backgroundColor : GlobalStyles.mainBgLight.backgroundColor }]}
        >
          <View style={[styles.main, { minHeight: windowHeight }]}>

            <Routes>
              <Route exact path='/'
                element={
                  <>
                    {/* {!hasConsent &&
                      <Consent
                        isMoreInfoHidden={isMoreInfoHidden}
                        setIsMoreInfoHidden={setIsMoreInfoHidden}
                      />
                    } */}
                    <Home />
                  </>
                }
              />
              <Route exact path='/inventory' element={ <Inventory /> }/>
              <Route exact path='/inventory/ingredients' element={ <Ingredients handleIngredientPick={handleIngredientPick} /> } />
              <Route exact path='/cart' element={ <Cart handleIngredientPick={handleIngredientPick} /> } />
              <Route exact path='/result' element={ <Result /> } />
              <Route exact path='/result/:id' element={ recipe && <Recipe /> } />
            </Routes>

          </View>
          <StatusBar style="auto" />
        </ScrollView>

        {(result === null && totalIngredientsPicked >= 3) &&
          <Suspense fallback={<Text>Chargement</Text>}>
            <Submit />
          </Suspense>
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
    // flex: 1,
    // height: '100%',
    paddingHorizontal: 10,
    color: 'black',
    zIndex: -1,
    // backgroundColor: '#fff8ef'
    // backgroundColor: '#252627'
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
    flex: 1,
    width: '100%',
    // backgroundColor: 'green',
    marginTop: 20,
  },
  footer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
