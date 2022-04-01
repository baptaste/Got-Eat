import { selector } from 'recoil'
import axios from 'axios'
import { formFieldsState } from '../atoms/login'
import { hasSubmitSignupState } from '../atoms/login'
import { baseAPIurl } from '../../constants'

export const memberSignupSendState = selector({
  key: 'memberSignupSendState',
  get: async ({ get }) => {
    const formFields = get(formFieldsState);
    const hasSubmit = get(hasSubmitSignupState);

    if (hasSubmit) {
      try {
        console.log('creating member...')
        const res = await axios.post(`${baseAPIurl}/api/member/create`, { ...formFields })

        if (res.data) {
          console.log('member create response :', res.data);
          return res.data
        }
      } catch (error) {
        console.log('member create error', error);
      }
    }

  }
})