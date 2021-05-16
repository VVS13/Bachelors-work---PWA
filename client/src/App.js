import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

import {Switch, Route, Redirect, Link} from 'react-router-dom'

//import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'

import {MainPage} from './pages/MainPage'
import {CreateRoom} from './pages/CreateRoom'
import {NoteRoom} from './pages/NoteRoom'
import {AuthPage} from './pages/AuthPage'

import "../node_modules/bootstrap/dist/css/bootstrap.css"


function App() {

  const {token,login,logout,userId} = useAuth()
  const isAuthenticated = !!token //

  //const routes = useRoutes(isAuthenticated) //changed true/false to be dynamic

  console.log(isAuthenticated,'bruh')

  return (

    <AuthContext.Provider value={{token,userId, login, logout, isAuthenticated}}>
      <Router> 

      <Switch>

        {isAuthenticated ? (
        <>
        <Route exact path="/">
          <MainPage />
          {/* <Link to="/main_page"></Link> */}
        </Route>
        {/* <Redirect to="/main_page"/> */}

        <Route path="/create_room">
          <CreateRoom/>
        </Route>

        <Route path="/note_room/:id">
           <NoteRoom/>
        </Route>
        </>
        ) : ( 
        <>
        <Route path="/">
          <AuthPage/>
        </Route>
        {/* <Redirect to="/" /> */}
        </>
        )}

      </Switch>

    </Router>

    </AuthContext.Provider>
    
  )
}

export default App
