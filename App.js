import React, { useState, useEffect } from 'react'
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Appearance, StatusBar, Dimensions } from 'react-native';
import { NativeRouter, Routes, Route } from "react-router-native";
// import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalStyles } from './styles/GlobalStyles';
import Head from './components/Head'
import Consent from './components/Consent'
// import Form from './components/Form'
import Inventory from './components/Inventory';
import Ingredients from './components/Ingredients';
import Submit from './components/Submit';
import Result from './components/Result';
import Nav from './components/Nav';
import Home from './components/Home';

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
  const [category, setCategory] = useState(null)
  const [stepsCompleted, setStepsCompleted] = useState([])
  const [userIngredients, setUserIngredients] = useState(['sel', 'poivre'])
  const [ingredientsPicked, setIngredientsPicked] = useState([])
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

  const handleIngredientPick = (name, boolean, value) => {
    setUserIngredients([...userIngredients, value.toLowerCase()])
    dispatchToState(name, boolean, value)
  }

  const dispatchToState = (categoryName, booleanName, value) => {
    const key = categoryName,
          booleanKey = booleanName;

    setState({
      ...state,
      [key]: [ ...state[key], value.toLowerCase() ],
      [booleanKey]: true
    })

    console.log(
      '***STATE UPDATE***',
      key, 'set to:', [ ...state[key], value ],
      booleanKey, 'set to:', true
    );
  }

  const clearState = () => {
    setCurrentLocation('/')
    setCategory(null)
    setStepsCompleted([])
    setUserIngredients(['sel', 'poivre'])
    setIngredientsPicked([])
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

  isStateClear && console.log('*** state cleared ***', state)

  useEffect(() => {
    if (userIngredients.length > 2) console.log('userIngredients :', userIngredients)
  }, [userIngredients])

  console.log('current location :', currentLocation);

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
                    setCurrentLocation={setCurrentLocation}
                    setCategory={setCategory}
                    stepsCompleted={stepsCompleted}
                    colorScheme={colorScheme}
                    clearState={clearState}
                    userIngredients={userIngredients}
                  />
              }
            />
            <Route exact path='/inventory/ingredients'
              element={
                <Ingredients
                  category={category}
                  handleIngredientPick={handleIngredientPick}
                  ingredientsPicked={ingredientsPicked}
                  setIngredientsPicked={setIngredientsPicked}
                  stepsCompleted={stepsCompleted}
                  setStepsCompleted={setStepsCompleted}
                  colorScheme={colorScheme}
                  windowHeight={windowHeight}
                  setCurrentLocation={setCurrentLocation}
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
    marginTop: 40,
    // backgroundColor: 'green'

  },
  footer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
