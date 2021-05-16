//need to hold jwt in local storage 

import {useState, useCallback, useEffect} from 'react'  //

const storageName = 'userData'

export const useAuth = () => {

    const [token,setToken] = useState(null)
    const [userId,setUserId] = useState(null)

    const login = useCallback((jwtToken,id) => {  //
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({token: jwtToken, userId: id})) //userId, token

    },[])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    },[])

    useEffect (() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data!=null &&data.token!=null){
            login(data.token,data.userId)
        }
    },[login])

    
    return{login,logout,userId,token}
}