import React, { useState } from 'react'
import {useHttp} from '../hooks/http.hook'

export const AuthPage = () => {

    const [form,setForm] = useState({
        username: '',password:''
    })

    const changeHandler = event =>{
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const {loading,request} = useHttp() //es lint error... need to remove 'error' to check if everything

    const registerHandler = async () => {
        try {

            const data = await request('/api/auth/register','POST', {...form}) //url...method... data that needed to transfered to server
            console.log('Data',data)

        } catch (e) {
            
        }
    } 

    return (
        <div className="container"> 
            <h1>Auth Page</h1>
            

            <div className="container-sm bg-dark text-white p-3 ">

                <div className="row">
                    <div className="col">
                        <div className="container" >
                        <h1 className="text-center">register form</h1>

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

                            <div className="p-1">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                                <label className="form-check-label" for="exampleCheck1">-maybe use for caching username and password </label>
                            </div>
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
                         disabled={loading}
                         >Login</button>

                    </div>
                </div>
            </div>
        </div>
        
        
    )

}