import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { useRoutes } from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'

import "../node_modules/bootstrap/dist/css/bootstrap.css"


function App() {

  const {token,login,logout,userId,isAuthenticated} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated) //changed true/false to be dynamic
  return (
    <AuthContext.Provider value={{token,userId, login, logout, isAuthenticated}}>
      <Router>
      <div >
        <h1>          
        {routes}
        </h1>
      </div>
      </Router>
    </AuthContext.Provider>
    
  )
}

export default App
