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

      <div className="container bg-dark text-white p-3">

        <div className="row">
        <div className="col">
          <div className="container" >
            <h1 className="text-center">
              register form
            </h1>
            <p>please input your username</p>
            <input type="text" class="form-control p-3" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
            <p>please input your password</p>
            <input type="password" class="form-control p-3" id="exampleInputEmail2" aria-describedby="emailHelpp"></input>
            
            <div className="p-1">
            <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
            <label class="form-check-label" for="exampleCheck1">-maybe use for caching username and password </label>
            </div>
           </div>
        </div>
        </div>
        <div className="row p-3">
          <div className="col">
          <button type="submit" class="btn btn-success container-fluid ">Register</button>
          </div>
          <div className="col">
          <button type="submit" class="btn btn-warning container-fluid">Login</button>
          </div>
        </div>
      </div>
      
    </Router>
    
  )
}

export default App
