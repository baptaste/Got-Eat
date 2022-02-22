import { selector } from 'recoil'
import { dataItemsState, userIngredientsState } from '../atoms/globals'

export const filteredDataItemsState = selector({
  key: 'filteredDataItemsState',
  get: ({ get }) => {
    /* TODO */
    const initialDataItems = get(dataItemsState)
    const userIngredients = get(userIngredientsState)

    let filteredDataItems = [...initialDataItems]

    filteredDataItems = filteredDataItems.filter(category => {
      let matchingCategories = []

      userIngredients.forEach(ingredient => {
        if (category.name === ingredient.name) matchingCategories.push(category)
      })

      if (matchingCategories.length !== 0) return matchingCategories
    })

    filteredDataItems = filteredDataItems.filter(category => {
      let matchingIngredients = []

      category.options.map(option => {
        userIngredients.forEach(ingredient => {
          if (option.value === ingredient.value) matchingIngredients.push(ingredient)
        })
      })

      category.options = matchingIngredients
      return matchingIngredients
    })

    return filteredDataItems
  }
})
