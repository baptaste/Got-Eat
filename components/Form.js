import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { GlobalStyles } from '../styles/GlobalStyles';
// import { formData } from '../data/formData'
import axios from "axios";

const Form = () => {
  const [formItems, setFormItems] = useState(formData)
  const [userIngredients, setUserIngredients] = useState([])
  const [stepsCompleted, setStepsCompleted] = useState([])
  const [currentStep, setCurrentStep] = useState(1)

  const [state, setState] = useState({
    hasStarchyFoods: true,
    hasProteins: true,
    hasVegetables: true,
    hasSpices: true,
    hasHerbs: true,
    starchyFoods: [],
    proteins: [],
    vegetables: [],
    spices: [],
    herbs: [],
  })

  console.log('state :', state);

  const handleValueChange = (value, name) => {
    setUserIngredients([...userIngredients, value.toLowerCase()])
    dispatchToState(name, value)
  }

  const dispatchToState = (name, value) => {
    const key = name

    if (typeof state[key] === 'boolean') {
      setState({
        ...state,
        [key]: false
      })
      console.log('***STATE UPDATE***', key, 'set to:', false);
    }

    if (typeof state[key] === 'object') {
      setState({
        ...state,
        [key]: [ ...state[key], value.toLowerCase() ]
      })
      console.log('***STATE UPDATE***', key, 'set to:', [ ...state[key], value ]);
    }
  }

  const handleHasNot = (name) => {
    dispatchToState(name)
  }

  const addMore = (formItem) => {
    // const ids = formItems.map(item => item.id)
    // const maxId = Math.max(...ids)
    // const newId = maxId + 1

    let itemCopy = { ...formItem }
    let newOptions = itemCopy.options.map(option => option.filter(item => !userIngredients.includes(item.value) && item))

    itemCopy.options = [ ...itemCopy.options, newOptions[0] ]

    let newFormItems = [ ...formItems, itemCopy ]

    newFormItems = newFormItems.map((item) => item !== formItem && item)
                               .filter(item => item !== false)
                               .sort((alpha, beta) => alpha.id - beta.id)

    setFormItems(newFormItems)
  }

  const handleNextStepPress = (stepId) => {
    setStepsCompleted([...stepsCompleted, stepId])

    setCurrentStep(stepId + 1)
    console.log('currentStep :', currentStep);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const userData = { ...state, userIngredients }

    const res = await axios.post(
      'http://localhost:3000/search/',
      userData,
      {
        headers: {
          Accept: 'application/json'
        },
      }
    );

    console.log('réponse du server : ', res);
  }

  // console.log('formItems :', formItems);
  // console.log('userIngredients :', userIngredients);
  // console.log('stepsCompleted :', stepsCompleted);
  console.log('currentStep :', currentStep);

  return (
    <View style={styles.form}>

      {formItems.map((select, index) => {

        // console.log('select.id === stepsCompleted[index + 1] :', select.id === stepsCompleted[index + 1])
        // select.id === stepsCompleted[index + 1] &&
        console.log('currentStep >= select.id :', currentStep >= select.id, currentStep >= select.id && select.id)
         return (
           currentStep >= select.id &&
            <View key={select.id} style={styles.select}>

            {/* <View style={[styles.selectHeading, GlobalStyles.row]}> */}
              <Text style={[GlobalStyles.text, GlobalStyles.mediumText, styles.question]}>
                {select.question}
                <Text style={[GlobalStyles.text, GlobalStyles.tinyText, styles.stepNumber]}>
                  {index + 1} / {formItems.length}
                </Text>
              </Text>

            {/* </View> */}

            {select.options.map((option, index) => (
              <View key={index} style={styles.selectRow}>
                {/* {typeof state[select.name] === 'boolean' && state[select.name] && } */}
                <Picker
                  selectedValue={option.value}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue, itemIndex) => itemIndex !== 0 && handleValueChange(itemValue, select.name)}
                >
                  {option.map(item => (
                    <Picker.Item key={item.value + index} label={item.value} value={item.value} />
                  ))}
                </Picker>
                {index === (select.options.length - 1) &&
                  <View style={styles.addMoreBtn}>
                    <Button title="+" color="#000" onPress={() => addMore(select)} />
                  </View>
                }

              </View>
            ))}

            <View style={styles.hasNotBtn}>
              <Button
                title={select.boolean.text}
                color={!state[select.boolean.name] && '#2b2b2b'}
                onPress={() => handleHasNot(select.boolean.name)} />
            </View>

            {/* TODO : not the last one, and remove btn if its not the current question */}
            {(state[select.name].length !== 0 || !state[select.boolean.name]) &&
              <View style={styles.nextStepBtn}>
                <Button
                  title='Suivant'
                  onPress={() => handleNextStepPress(select.id)}
                />
              </View>
            }
         </View>
        )
      })}

      {currentStep === formItems.length &&
        <View style={styles.submitBtn}>
          <Button title="J'ai faim" color="black" onPress={handleSubmit} />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
    marginBottom: 10,
  },
  question: {
    alignItems: 'center',
    fontSize: 25,
  },
  stepNumber: {
    alignItems: 'baseline',
    paddingLeft: 20,
    color: 'lightgrey'
  },
  select: {
    marginBottom: 50,
  },
  selectRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addMoreBtn: {
    width: '10%',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
  },
  hasNotBtn: {
    width: '50%',
    marginTop: 10,
    marginBottom: 10,
  },
  nextStepBtn: {
    width: '50%',
    marginTop: 10,
    marginBottom: 10,
  },
  active: {

  },
  submitBtn: {
    width: '50%',
    marginLeft: '25%',
    marginRight: '25%',
    marginBottom: 50,
  }
});

export default Form