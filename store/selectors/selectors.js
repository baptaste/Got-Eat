import axios from 'axios'
import { selector } from 'recoil'
import { dataItemsState, userIngredientsState, resultState, ingredientsState, foundRecipeListState } from '../atoms/globals'
import { hasSubmitState } from '../atoms/settings'

const baseAPIurl = 'http://192.168.1.33:3000/'

// either Error obj, OR Success arr with recipe(s)
export const recipeQueryState = selector({
  key: 'recipeQueryState',
  get: async ({ get }) => {
    const hasSubmit = get(hasSubmitState)
    const ingredients = get(ingredientsState)
    const ingredientsToString = get(userIngredientsState).map(item => item.value.toLowerCase())
    const foundRecipeList = get(foundRecipeListState)

    const userData = { ...ingredients, ingredientsToString }

    console.log('ingredientsToString :', ingredientsToString);

    if (hasSubmit) {
      try {
        console.log('fetching data...');
        const res = await axios.get(`${baseAPIurl}getRecipes`, { params: userData })

        if (res.data) {

          if (res.data.status === 'Success') {
            console.log('recipe query : if success');
            const resultRecipes = [...res.data.recipes]
            let currentFoundRecipe = null

            foundRecipeList.find(recipe => {
              resultRecipes.map(resItem => {
                if (resItem.id === recipe.id) {
                  currentFoundRecipe = recipe
                  return currentFoundRecipe
                }
              })
              return currentFoundRecipe
            })

            if (currentFoundRecipe !== null) {
              console.log('recipe query : success status but recipe already present in user recipe list');
              return {
                status: 'Success',
                recipes: [{ ...currentFoundRecipe }],
                message: 'Tu as déjà trouvé une recette avec ces ingrédients.',
                isAlreadyInState: true
              }
            } else {
              console.log('recipe query : success status');
              return res.data
            }

          } else {
            console.log('recipe query : error status');
            return res.data
          }
        }

      } catch (error) {
        console.log(error)
      }
    }
  }
})
