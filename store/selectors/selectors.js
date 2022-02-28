import axios from 'axios'
import { selector } from 'recoil'
import { dataItemsState, userIngredientsState, resultState, ingredientsState, recipeListState } from '../atoms/globals'
import { hasSubmitState } from '../atoms/settings'

// either Error obj, OR Success arr with recipe(s)
export const recipeQueryState = selector({
  key: 'recipeQueryState',
  get: async ({ get }) => {
    const hasSubmit = get(hasSubmitState)
    const ingredients = get(ingredientsState)
    const ingredientsToString = get(userIngredientsState).map(item => item.value.toLowerCase())
    const recipeList = get(recipeListState)

    const userData = { ...ingredients, ingredientsToString }

    if (hasSubmit) {
      try {
        console.log('fetching data...');
        const res = await axios.get('http://192.168.1.33:3000/getRecipes/', { params: userData })
        // const resultRecipes = [...res.data.recipes]
        // console.log('SELECTOR resultRecipes :', resultRecipes);
        // console.log('SELECTOR recipeList :', recipeList);

        // const isAlreadyInState = recipeList.filter(stateRecipe => {
        //   let foundRecipe;

        //   resultRecipes.forEach(recipe => {
        //     if (recipe === stateRecipe) {
        //       console.log('recipe === stateRecipe MATCH ', recipe === stateRecipe);
        //       foundRecipe = stateRecipe
        //     }
        //   })

        //   if (resultRecipes.includes(stateRecipe)) {
        //     console.log('resultRecipes.includes(stateRecipe) MATCH ', resultRecipes.includes(stateRecipe));
        //     foundRecipe = stateRecipe
        //   }

        //   return foundRecipe
        // })

        // console.log('isAlreadyInState ? ', isAlreadyInState);

        return res.data
      } catch (error) {
        console.log(error)
      }
    }
  }
})
