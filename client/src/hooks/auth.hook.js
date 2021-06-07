//need to hold jwt in local storage 

import {useState, useCallback, useEffect} from 'react'  //,history

const storageName = 'userData'

export const useAuth = () => {

    const [token,setToken] = useState(null)
    //variable which will be set to authenticated users JWT token value

    const [userId,setUserId] = useState(null)
    //variable which will be set to authenticated users id

    const [readLoginStatus, setLoginStatus] = useState(false);
    //bool to check if user is loged in or not 

    const [firstTime, setFirstTime] = useState(false);
    //bool to check if page is rendered for the first time

    const login = useCallback((jwtToken,id) => {
    //callBack hook that sets token and UserId variables, to ones of currently loged in user
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({token: jwtToken, userId: id})) 
        //creates local storage instance where current loged in users variables token and userID are stored in JSON string format
    },[])

    const logout = useCallback(() => {
    //call back hook that sets token and UserId variables to null on logout
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
        //deletes information stored in localstorage

        //setLoginStatus(false)///////////
        setFirstTime(false)

    },[])
    
    useEffect (() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        //parses JSON string, constructs JavaScript value

        setLoginStatus(true)

        if(data!=null &&data.token!=null){
            login(data.token,data.userId)
        }

    },[login])

    useEffect (() => {
        //UseEffect hook which sets FirstTime bool to true after everything got rendered
        if (readLoginStatus && !firstTime) {
            setFirstTime(true)

        }
    },[readLoginStatus,firstTime])

    
    return{login,logout,userId,token,readLoginStatus}
}