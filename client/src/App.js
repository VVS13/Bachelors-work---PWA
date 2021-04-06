import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { useRoutes } from './routes'

import "../node_modules/bootstrap/dist/css/bootstrap.css"


function App() {
  const routes = useRoutes(false)
  return (
    <Router>
      <div >
        <h1>          
        {routes}
        </h1>
      </div>
      
    </Router>
    
  )
}

export default App
