import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import Undo from '../components/Undo'
import Close from '../assets/icons/cancel.png'
import { useRecoilValue } from 'recoil'
import { userIngredientsState } from '../store/atoms/globals'

export default function CartModal({ clearState, handleCartButtonPress, colorScheme }) {

  const userIngredients = useRecoilValue(userIngredientsState)

  return (
       <View style={[styles.cartBlock, GlobalStyles.fourthBg]}>

       <Text style={[ GlobalStyles.bigText, GlobalStyles.textBold ]}>
         {userIngredients.length >= 3 ?
           `${userIngredients.length - 2} ${(userIngredients.length - 2) > 1 ? 'sélectionnés' : 'sélectionné'}`
           : 'Ingrédients de base'
         }
       </Text>

       <View style={[GlobalStyles.row, styles.cartList]}>
         {userIngredients.map((ingredient, index) =>
           <Text
             key={ingredient.value}
             style={[
               GlobalStyles.textBold, GlobalStyles.whiteText,
               { paddingHorizontal: 10, paddingVertical: 5, marginRight: 5, marginBottom: 5,
                 backgroundColor: index < 2 ? GlobalStyles.thirdBg.backgroundColor : GlobalStyles.secondBg.backgroundColor, borderRadius: 7 }
               ]}
           >
             {ingredient.value.charAt(0).toUpperCase() + ingredient.value.slice(1)}
           </Text>
         )}
       </View>

       <TouchableOpacity
         onPress={handleCartButtonPress}
         style={styles.close}
       >
         <Image source={Close}
           style={{  width: 20, height: 20, tintColor: colorScheme === 'dark' ? GlobalStyles.fourthColor.color : '#2e2e2e' }}
         />
       </TouchableOpacity>

       {userIngredients.length >= 3 &&
         <Undo colorScheme={colorScheme} marginTop={32}
       />}

     </View>
  )
}

const styles = StyleSheet.create({
  cartBlock: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.51,
    shadowRadius: 10,
    elevation: 15
  },
  cartList: {
    flexWrap: 'wrap',
    marginTop: 16,
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10
  }
})