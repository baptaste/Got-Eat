import React from 'react'
import { Image } from 'react-native'
import { Link } from 'react-router-native'

export default function GoBack({ pathname }) {
  return (
    <Link to={pathname === '/inventory' ? '/inventory' : '/'} style={{ width: 50, height: 40, }}>
      <Image
        source={require('../assets/icons/left-arrow.png')}
        style={{ width: 23, height: 23, tintColor: 'grey' }}
      />
    </Link>
  )
}
