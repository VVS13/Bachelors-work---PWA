import {createContext} from 'react'

// so all variables and functions have statuss set to something as page launches
//it can transfer all this data through whole app

function blank () {} //so functions get cleared

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: blank,
    logout: blank,


    isAuthenticated: false
    
})