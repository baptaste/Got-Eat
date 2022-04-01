import { atom } from 'recoil'

export const memberState = atom({
  key: 'memberState',
  default: null
})

export const signedInState = atom({
  key: 'signedInState',
  default: false
})

export const loggedInState = atom({
  key: 'loggedInState',
  default: false
})

export const bookmarkListState = atom({
  key: 'bookmarkListState',
  default: []
})