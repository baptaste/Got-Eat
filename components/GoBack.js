import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { useNavigate } from 'react-router-native'

export default function GoBack() {
  const navigate = useNavigate()

  return (
    <TouchableOpacity
      onPress={() => navigate(-1)}
      style={{ width: 50, height: 40,  justifyContent: 'center', marginLeft: 5}}
    >
      <Image
        source={require('../assets/icons/left-arrow.png')}
        style={{ width: 25, height: 25, tintColor: 'grey' }}
      />
    </TouchableOpacity>
  )
}
