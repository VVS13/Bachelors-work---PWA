//need to hold jwt in local storage 

import {useState, useCallback, useEffect} from 'react'  //,history

const storageName = 'userData'

export const useAuth = () => {

    const [token,setToken] = useState(null)
    const [userId,setUserId] = useState(null)

    const [readLoginStatus, setLoginStatus] = useState(false);//
    const [firstTime, setFirstTime] = useState(false);

    const login = useCallback((jwtToken,id) => {  //
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({token: jwtToken, userId: id})) //userId, token
    },[])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)

        //setLoginStatus(false)///////////
        setFirstTime(false)

    },[])
    
    useEffect (() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        setLoginStatus(true)
        // info that there is something in local storage that passed auth checks

        if(data!=null &&data.token!=null){
            login(data.token,data.userId)
        }
    },[login])

    useEffect (() => {
        if (readLoginStatus && !firstTime) {
            //history.push("/main_page")
            setFirstTime(true)
            //on first 

        }
    },[readLoginStatus,firstTime])

    
    return{login,logout,userId,token,readLoginStatus}
}