import { atom } from 'recoil'

export const formFieldsState = atom({
  key: 'formFieldsState',
  default: {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  }
})

export const hasSubmitSignupState = atom({
  key: 'hasSubmitSignupState',
  default: false
})
