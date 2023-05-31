import { createContext } from 'react';

export const GlobalContext = createContext({
  auth: {

    authToken: '',
    refreshToken: '',
  },
  setAuth: (auth: any) => { },
})
