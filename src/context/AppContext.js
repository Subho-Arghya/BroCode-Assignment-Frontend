import React , {createContext, useState} from 'react'

export const AppContext = createContext(null)

export const AppContextProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(true)

    const value = { isAdmin, setIsAdmin}

  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}
