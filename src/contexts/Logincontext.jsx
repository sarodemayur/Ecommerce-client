import React from 'react'
import { createContext } from 'react'

export const LoginContext = createContext()
const LoginProvider = ({children}) => {
  return (
    <LoginContext.Provider>
       This is a login context.
    </LoginContext.Provider>
  )
}

export default LoginProvider
