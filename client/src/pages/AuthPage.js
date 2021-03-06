
import React, { useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {

    const auth = useContext(AuthContext) // auth with all the methods  login logout

    const [form,setForm] = useState({
        username: '',password:''
    })

    const changeHandler = event =>{
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const {loading,request} = useHttp() //es lint ... need to remove 'error' to check  everything

   
    const registerHandler = async () => {
        try {

            const data = await request('/api/auth/register','POST', {...form}) //url...method... data that needed to transfered to server
            
            console.log('Data',data)/////////////////////////

        } catch (e) {
            
        }
    } 

    const loginHandler = async () => {
        try {

            const data = await request('/api/auth/login','POST', {...form}) //url...method... data that needed to transfered to server

            auth.login(data.token, data.userId)

            //console.log('Data',data)

        } catch (e) {
            
        }
    } 

    

    return (
        <div class="col w-100 h-100 text-center " > 
            <h1>Shared shopping list</h1>
            

            <div  class="container-sm bg-secondary text-white p-3 border border-warning " > 

                <div className="row">
                    <div className="col">
                        <div className="container" >
                        <h3 className="text-center">register form</h3>

                        <p>please input your username</p>
                        <input className="form-control p-3"
                        type="text" 
                        id="username"  
                        name="username"
                        onChange={changeHandler}
                        ></input>

                        <p>please input your password</p>
                        <input className="form-control p-3"
                         type="password"  
                         id="password" 
                         name="password"
                        onChange={changeHandler}
                        ></input>
                        <br/>
                        </div>
                    </div>
                </div>
                <div className="row p-3">
                    <div className="col">

                        <button className="btn btn-success container-fluid "
                        type="submit" 
                        onClick={registerHandler}
                        disabled={loading}
                        >Register</button>

                    </div>
                    <div className="col">

                        <button className="btn btn-warning container-fluid"
                         type="submit" 
                         onClick={loginHandler}
                         disabled={loading}
                         >Login</button>

                    </div>
                </div>
            </div>
        </div>
        
        
    )

}