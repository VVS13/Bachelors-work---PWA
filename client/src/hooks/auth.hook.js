//need to hold jwt in local storage 

import {useState, useCallback} from 'react'

const storageName = 'userData'

export const useAuth = () => {

    const [token,setToken] = useState(null)
    const [userId,setUserId] = useState(null)

    const login = useCallback((jwtToken,id) => {  //
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({token: jwtToken, userId: id}))

    },[])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    },[])

    return{login,logout,userId,token}
}