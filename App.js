import React, { useState, useEffect } from 'react'
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Appearance, StatusBar, Dimensions } from 'react-native';
import { NativeRouter, Routes, Route } from "react-router-native";
// import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalStyles } from './styles/GlobalStyles';
import { formData } from './data'
import Salt from './assets/icons/salt.png'
import Pepper from './assets/icons/pepper.png'
import Consent from './components/Consent'
import Inventory from './components/Inventory';
import Ingredients from './components/Ingredients';
import Submit from './components/Submit';
import Result from './components/Result';
import Nav from './components/Nav';
import Home from './components/Home';
import Cart from './components/Cart';

export default function App() {
  const colorScheme = Appearance.getColorScheme()

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
  }, [])

  // const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  const [isMoreInfoHidden, setIsMoreInfoHidden] = useState(true)
  const [hasConsent, setHasConsent] = useState(false)
  const [formItems, setFormItems] = useState(formData)
  const [category, setCategory] = useState(null)
  const [stepsCompleted, setStepsCompleted] = useState([])
  const [userIngredients, setUserIngredients] = useState([
    { value: 'Sel', name: 'default', image: Salt },
    { value: 'Poivre', name: 'default', image: Pepper }
  ])
  const [currentIngredientsPicked, setCurrentIngredientsPicked] = useState([])
  const [result, setResult] = useState(null)
  const [isStateClear, setIsStateClear] = useState(false)
  const [currentLocation, setCurrentLocation] = useState('/')

  const [state, setState] = useState({
    hasStarchyFoods: false,
    hasMeat: false,
    hasFish: false,
    hasProteins: false,
    hasVegetables: false,
    hasDairy: false,
    hasCondiments: false,
    hasSpices: false,
    hasHerbs: false,
    starchyFoods: [],
    meat: [],
    fish: [],
    proteins: [],
    vegetables: [],
    dairy: [],
    condiments: [],
    spices: [],
    herbs: [],
  })
  // console.log('state :', state);

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

  const dispatchToState = (categoryName, booleanName, value) => {
    const key = categoryName,
          booleanKey = booleanName;
    // if (state[categoryName])

    /* TODO : passer le booleen a true lors de l'ajout d'un ingredient , ça c'est bon.
      MAIS le repasser a false SI on a supprimé tous les ingredients correspondant au Array du state
    */

    const isAlreadyInState = state[key].includes(value)

    if (isAlreadyInState) {
      console.log('MODIFYING // ingredient', value, 'already present in', key);
      const updatedStateKey = state[key].filter(el => el !== value)
      setState({
        ...state,
        [key]: [...updatedStateKey],
        [booleanKey]: updatedStateKey.length >= 1 ? true : !state[booleanKey]
      })
      console.log('***STATE UPDATE*** , ingredient', value, 'removed in', key, updatedStateKey);
    }

    if (!isAlreadyInState) {
      setState({
        ...state,
        [key]: [ ...state[key], value ], // A REVOIR
        [booleanKey]: state[key].length >= 1 ? true : !state[booleanKey] // A REVOIR
      })

      console.log(
        '***STATE UPDATE***',
        key, 'added to:', [ ...state[key], value ],
        booleanKey, 'set to:', state[key].length >= 1 ? true : !state[booleanKey]
      );
    }
  }

  const clearState = () => {
    setCurrentLocation('/')
    setCategory(null)
    setStepsCompleted([])
    setUserIngredients([
      { value: 'Sel', name: 'default', image: Salt },
      { value: 'Poivre', name: 'default', image: Pepper }
    ])
    setCurrentIngredientsPicked([])
    setResult(null)
    setState({
      hasStarchyFoods: false,
      hasMeat: false,
      hasFish: false,
      hasProteins: false,
      hasVegetables: false,
      hasDairy: false,
      hasCondiments: false,
      hasSpices: false,
      hasHerbs: false,
      starchyFoods: [],
      meat: [],
      fish: [],
      proteins: [],
      vegetables: [],
      dairy: [],
      condiments: [],
      spices: [],
      herbs: [],
    })
    setIsStateClear(true)
  }

  useEffect(() => {
    console.log('state :', state);
  }, [state])

  // useEffect(() => {
  //   console.log('userIngredients :', userIngredients);
  // }, [userIngredients])

   useEffect(() => {
    isStateClear && console.log('*** state cleared ***')
  }, [isStateClear])

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
                  <Home windowHeight={windowHeight} colorScheme={colorScheme} />
                </>
              }
            />
            <Route exact path='/inventory'
              element={
                hasConsent &&
                  <Inventory
                    formItems={formItems}
                    setCurrentLocation={setCurrentLocation}
                    setCategory={setCategory}
                    stepsCompleted={stepsCompleted}
                    userIngredients={userIngredients}
                    state={state}
                    clearState={clearState}
                  />
              }
            />
            <Route exact path='/inventory/ingredients'
              element={
                <Ingredients
                  category={category}
                  userIngredients={userIngredients}
                  currentIngredientsPicked={currentIngredientsPicked}
                  setCurrentIngredientsPicked={setCurrentIngredientsPicked}
                  handleIngredientPick={handleIngredientPick}
                  stepsCompleted={stepsCompleted}
                  setStepsCompleted={setStepsCompleted}
                  colorScheme={colorScheme}
                  windowHeight={windowHeight}
                  setCurrentLocation={setCurrentLocation}
                  state={state}
                />
              }
            />
            <Route exact path='/cart'
              element={
                <Cart
                  setCurrentLocation={setCurrentLocation}
                  clearState={clearState}
                  userIngredients={userIngredients}
                  colorScheme={colorScheme}
                />
              }
            />
            <Route exact path='/result'
              element={
                <Result result={result} colorScheme={colorScheme} setCurrentLocation={setCurrentLocation} />
              }
            />
          </Routes>

        </View>

        <StatusBar style="auto" />
      </ScrollView>


      {userIngredients.length > 5 && result === null &&
        <Submit state={state} userIngredients={userIngredients} setResult={setResult} />
      }

      <View style={styles.footer}>
        <Nav colorScheme={colorScheme} clearState={clearState} result={result} currentLocation={currentLocation} />
      </View>

    </NativeRouter>
    // </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: '100%',
    // height: '100%',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // paddingTop: StatusBar.currentHeight ,
    paddingHorizontal: 10,
    // backgroundColor: 'white',
    // backgroundColor: 'green',
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
    // flex: 1,
    marginTop: 20,
    // backgroundColor: 'green'
  },
  footer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
