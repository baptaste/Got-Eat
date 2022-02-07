import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalStyles } from '../styles/GlobalStyles';

export default function Consent({ isMoreInfoHidden, setIsMoreInfoHidden }) {

  const storeConsentData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key : user consent rules', jsonValue)
    } catch (error) {
      console.log('Error', error);
    }
  }

  return (
    <View>
      <Text style={[GlobalStyles.mediumText, styles.infoText]}>
        Afin de te trouver la ou les bonnes recettes, nous avons besoin que tu répondes à ces quelques questions.
        Promis, c'est rapide !
      </Text>
      {isMoreInfoHidden &&
        <View style={styles.consentButtons}>
          <Button
            onPress={() => setIsMoreInfoHidden(false)}
            title="+ d'info"
            color="#2b2b2b"
          />
          <Button
              onPress={() => storeConsentData(true)}
              title="Ok pour moi"
              color="black"
            />
        </View>
      }
      {!isMoreInfoHidden &&
        <View>
          <Text style={[GlobalStyles.smallText, styles.moreInfoText]}>
            Nous considérons que tu possédes déjà le minimum pour préparer quelque chose !
            C'est à dire du sel, du proivre, de l'huile, du vinaigre et du beurre.
          </Text>
          <Button
            onPress={() => storeConsentData(true)}
            title="Ok pour moi"
            color="black"
          />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  consentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 20
  },
  infoText: {
    textAlign: 'center'
  },
  moreInfoText: {
    margin: 20,
    textAlign: 'center'
  }
});
