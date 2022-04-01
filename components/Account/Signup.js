import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Inpu } from 'react-native'
import { useNavigate } from 'react-router-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

import { currentLocationState } from '../../store/atoms/settings'
import { signedInState, loggedInState, memberState } from '../../store/atoms/member'
import { formFieldsState, hasSubmitSignupState } from '../../store/atoms/login'
import { memberSignupSendState } from '../../store/selectors/postRequests'
import { useRecoilValue, useSetRecoilState, useResetRecoilState, useRecoilState } from 'recoil'

import PageHead from '../PageHead'

export default function Signup() {

  const navigate = useNavigate()
  const $loggedIn = useRecoilValue(loggedInState)

  const formData = [
    { label: 'Prénom', field: 'firstname', type: '' },
    { label: 'Nom', field: 'lastname', type: '' },
    { label: 'Surnom', field: 'username', type: '' },
    { label: 'Mail', field: 'email', type: 'email-address' },
    { label: 'Mot de passe', field: 'password', type: '' },
  ]

  const [$formFields, setFormFields] = useRecoilState(formFieldsState)
  const $memberReponse = useRecoilValue(memberSignupSendState)
  const [$hasSubmit, setHasSubmit] = useRecoilState(hasSubmitSignupState)
  const [$member, setMember] = useRecoilState(memberState)
  const [$signedIn, setSignedIn] = useRecoilState(signedInState)

  const [isFieldsMissing, setIsFieldsMissing] = useState(true)

  const handleInputChange = (field, newValue) => {
    setFormFields({ ...$formFields, [field]: newValue })
  }

  const handleSignup = () => setHasSubmit(true)

  const createMember = () => {
    setMember($memberReponse)
    if ($signedIn) {
      navigate('/login')
    }
  }

  const checkMissingFields = () => {
    for (const key in $formFields) {
      if ($formFields[key] === '') {
        return setIsFieldsMissing(true)
      }
      setIsFieldsMissing(false)
    }
  }

  useEffect(() => {
    console.log('formFields:', $formFields);
    checkMissingFields()
  }, [$formFields])

  useEffect(() => {
    if ($hasSubmit) {
      createMember()
    }
  }, [$hasSubmit])

  useEffect(() => {
    if ($member !== null) {
      console.log('after member created, member =', $member);
      setSignedIn(true)
    }
  }, [$member])

  return (
    <View style={{ width: '100%' }}>
      <PageHead title="S'inscrire" />

      <View style={styles.signupForm}>
        {formData.map(({ label, field }, index) => (
          <View
            key={index + label}
            style={[ { width: '100%', height: 80, justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 } ]}
          >
            <Text style={[GlobalStyles.textBold, GlobalStyles.bigText, { width: '100%', textAlign: 'left' }]}>
              {label}
            </Text>
            <TextInput
              onChangeText={(value) => handleInputChange(field, value)}
              style={[styles.signupInput, GlobalStyles.bigText ]}
            />
          </View>
        ))}
      </View>

      <TouchableOpacity
        disabled={isFieldsMissing}
        style={ [ styles.signupSubmitBtn, isFieldsMissing ? styles.disabled : styles.active ] }
        onPress={handleSignup}
      >
        <Text
          style={
              [ GlobalStyles.textBold, GlobalStyles.mediumText,
              { color: isFieldsMissing ? styles.disabled.color : styles.active.color } ]
            }
          >
            Envoyer
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  signupForm: {
    paddingLeft: 16
  },
  signupInput: {
    width: '70%',
    height: '60%',
    alignSelf: 'flex-start',
    borderBottomWidth: 2,
    borderColor: '#ddd',
    // paddingLeft: 16
  },
  signupSubmitBtn: {
    width: '50%',
    marginVertical: 32,
    marginHorizontal: '25%',
    paddingHorizontal: 8,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 16,
  },
  disabled: {
    backgroundColor: 'grey',
    color: 'black'
  },
  active: {
    backgroundColor: GlobalStyles.mainBgDark.backgroundColor,
    color: GlobalStyles.secondColor.color
  }
})