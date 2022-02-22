import { atom } from 'recoil'
import data from '../../data'
import Salt from '../../assets/icons/salt.png'
import Pepper from '../../assets/icons/pepper.png'

export const dataItemsState = atom({
  key: 'dataItemsState',
  default: data
})

export const ingredientsState = atom({
  key: 'ingredientsState',
  default: {
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
  }
})

export const categoryState = atom({
  key: 'categoryState',
  default: null
})

export const userIngredientsState = atom({
  key: 'userIngredientsState',
  default: [
    { value: 'Sel', name: 'default', image: Salt, category: 'Les essentiels' },
    { value: 'Poivre', name: 'default', image: Pepper, category: 'Les essentiels' }
  ]
})

export const resultState = atom({
  key: 'resultState',
  default: null
})

export const recipeState = atom({
  key: 'recipeState',
  default: null
})