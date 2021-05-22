import React , {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'


export const Navbar = () => {

    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return( 

        //when it is coppied even original code in naroved form is not opening the menu using button 
        //need to be solved important

        <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{padding: '1rem 2rem'}}>
        <a class="navbar-brand" href="/">App name</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="/">Home </a> 
                {/*  span after home is not working <span class="sr-only">(current)</span> */}
            </li>
            <li class="nav-item">
                <a class="nav-link" href="create_room">Create room</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/" onClick={logoutHandler} >Logout</a>
            </li>
            </ul>
        </div>
        </nav>



        // <nav class="navbar navbar-expand-lg navbar-light bg-light">

        // <a class="navbar-brand" href="/">  APP NAME</a>
        
        // <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //     <span class="navbar-toggler-icon"></span>
        // </button>

        // <div class="collapse navbar-collapse" id="navbarNav">
        //     <ul class="navbar-nav">
        //     <li class="nav-item nav-link active">
        //         <NavLink to="/">MainPage <span class="sr-only">(current)</span></NavLink>
        //     </li>
        //     <li class="nav-item nav-link">
        //         <NavLink to="/create_room">Create room</NavLink>
        //     </li>
        //     <li class="nav-item nav-link">
        //     <a href="/" onClick={logoutHandler}>Logout</a>
        //     </li>
        //     {/* <li class="nav-item">
        //         <a class="nav-link disabled" href="#">Disabled</a>
        //     </li> */}
        //     </ul>
        // </div>
        // </nav>





        // <nav class="navbar navbar-expand-lg navbar-light bg-light">

        // <a class="navbar-brand" href="#">Navbar</a>

        // <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        //     <span class="navbar-toggler-icon"></span>
        // </button>

        // <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        //     <div class="navbar-nav">

        //         <NavLink to="/">MainPage <span class="sr-only">(current)</span></NavLink>
        //         <NavLink to="/create_room">Features</NavLink>
        //         <a class="nav-item nav-link" href="/">Logout</a>

        //     </div>
        // </div>
        
        // </nav>
    )

}