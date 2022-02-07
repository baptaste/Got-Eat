import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Routes, Route, Link } from "react-router-native";
// import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GlobalStyles } from './styles/GlobalStyles';
import Head from './components/Head'
import Consent from './components/Consent'
// import Form from './components/Form'
import Inventory from './components/Inventory';
import Ingredients from './components/Ingredients';

export default function App() {
  const [isMoreInfoHidden, setIsMoreInfoHidden] = useState(true)
  const [hasConsent, setHasConsent] = useState(false)
  const [category, setCategory] = useState(null)

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

  useEffect(() => {
    console.log('category :', category);
  }, [category])

  return (
    // <LinearGradient
    //     colors={['rgba(0,0,0,1)', 'rgba(37,31,193,1)']}
    //     style={styles.background}
    //   >
    <NativeRouter>
      <View style={styles.container}>

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
                <Inventory setCategory={setCategory} />
              </View>
              </>
            }
          >
          </Route>
          <Route path='/ingredients/:id' element={<Ingredients category={category} />} />
        </Routes>

        <StatusBar style="auto" />
      </View>
    </NativeRouter>
    // </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: '100vh',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 50,
    backgroundColor: 'white',
    color: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100vh'
  },
  main: {
    flex: 15,
    // flex: 8,
    width: '100%',
    // height: '50%',
    // padding: 20,
    margin: 10,
  },
});
