import { atom } from 'recoil'

export const currentLocationState = atom({
  key: 'currentLocationState',
  default: ''
})

export const colorSchemeState = atom({
  key: 'colorSchemeState',
  default: ''
})

export const windowHeightState = atom({
  key: 'windowHeightState',
  default: 0
})

export const isLoadingState = atom({
  key: 'isLoadingState',
  default: false
})

export const hasSubmitState = atom({
  key: 'hasSubmitState',
  default: false
})