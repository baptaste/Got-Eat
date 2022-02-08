import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { NativeRouter, Routes, Route, Link, useNavigate } from "react-router-native";
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

export default function App() {
  const [isMoreInfoHidden, setIsMoreInfoHidden] = useState(true)
  const [hasConsent, setHasConsent] = useState(false)
  const [category, setCategory] = useState(null)
  const [stepsCompleted, setStepsCompleted] = useState([])
  const [userIngredients, setUserIngredients] = useState(['sel', 'poivre', 'huile', 'vinaigre', 'beurre'])
  const [ingredientsPicked, setIngredientsPicked] = useState([])
  const [result, setResult] = useState(null)

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
  console.log('state :', state);

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

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key : user consent rules')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log('Error', error);
    }
  }

  useEffect(() => {
    getData().then((res) => {
      console.log('user consent rules')
      setHasConsent(res)
    })
  }, [])

  // useEffect(() => {
  //   if (userIngredients.length > 5) console.log('userIngredients :', userIngredients);
  // }, [userIngredients])

  // useEffect(() => {
  //   if (stepsCompleted[0]) console.log('stepsCompleted :', stepsCompleted);
  // }, [stepsCompleted])


  return (
    // <LinearGradient
    //     colors={['rgba(0,0,0,1)', 'rgba(37,31,193,1)']}
    //     style={styles.background}
    //   >
    <NativeRouter>
      <ScrollView contentContainerStyle={styles.container}>
        <Routes>
          <Route
            exact path='/'
            element={
              <>
              <Head />
              <View style={styles.main}>
                {!hasConsent &&
                  <Consent
                    isMoreInfoHidden={isMoreInfoHidden}
                    setIsMoreInfoHidden={setIsMoreInfoHidden}
                  />
                }
                <Inventory
                  setCategory={setCategory}
                  stepsCompleted={stepsCompleted}
                />
                <Submit state={state} userIngredients={userIngredients} setResult={setResult} />
              </View>
              </>
            }
          />
          <Route path='/ingredients/:id'
            element={
              <Ingredients
                category={category}
                handleIngredientPick={handleIngredientPick}
                ingredientsPicked={ingredientsPicked}
                setIngredientsPicked={setIngredientsPicked}
                stepsCompleted={stepsCompleted}
                setStepsCompleted={setStepsCompleted}
              />
            }
          />
          <Route path='/result' element={<Result result={result} />} />
        </Routes>

        <StatusBar style="auto" />

      </ScrollView>
    </NativeRouter>
    // </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 50,
    backgroundColor: 'white',
    color: 'black'
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
    flex: 1,
    margin: 10,
  },
});
