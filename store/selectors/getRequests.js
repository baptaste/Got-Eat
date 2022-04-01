import axios from 'axios'
import { selector } from 'recoil'
import { dataItemsState, userIngredientsState, resultState, ingredientsState, foundRecipeListState } from '../atoms/globals'
import { hasSubmitRecipeState } from '../atoms/settings'
import { baseAPIurl } from '../../constants'

export const categoryListQueryState = selector({
  key: 'categoryListQueryState',
  get: async ({ get }) => {
    try {
      console.log('fetching categories...');
      const res = await axios.get(`${baseAPIurl}/api/category/list`)

      if (res.data.success) {
        console.log('SELECTOR categoryListQueryState | res.data :', res.data);
        return res.data.result
      }
    } catch (error) {
      console.log(error)
    }
  }
})

// either Error obj, OR Success arr with recipe(s)
export const recipeQueryState = selector({
  key: 'recipeQueryState',
  get: async ({ get }) => {
    const hasSubmit = get(hasSubmitRecipeState);
    const ingredients = get(ingredientsState);
    const ingredientsValues = get(userIngredientsState).map(item => item.value);
    const foundRecipeList = get(foundRecipeListState);

    const userData = { ...ingredients, ingredientsValues };

    console.log('ingredientsValues :', ingredientsValues);

    if (hasSubmit) {
      try {
        console.log('fetching data...');
        const res = await axios.get(`${baseAPIurl}/api/result`, { params: userData })

        if (res.data) {

          //TODO mettre a jour avec les bonnes clés de la bdd (ex: res.data.status => res.data.success)

          if (res.data.success) {
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
                success: true,
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
