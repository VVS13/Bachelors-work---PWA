
import React, {useState,useEffect,useContext,useCallback} from 'react'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {RoomArrayDiv} from '../components/RoomArrayDiv'

import {RoomCreateDiv} from '../components/RoomCreateDiv'

import {RoomRemoveDiv} from '../components/RoomRemoveDiv'

export const MainPage = () => {

    const {token} = useContext(AuthContext) // to authorize
    const {loading, request} = useHttp()
    const [o_rooms, set_O_Rooms] = useState([])
    const [i_rooms, set_I_Rooms] = useState([])


    //here we get all rooms in room.routes all info is gathered there 
    const fetch_O_Rooms = useCallback( async () => {
        try{

            const fetched = await request('/api/room/owner','GET',null,{Authorization: `Bearer ${token}`})
            set_O_Rooms(fetched)

            console.log(fetched,'aaaaaaaaaaaaaaaaa')

        }catch(e){
            console.log(e)
        }
    },[token,request])

    const fetch_I_Rooms = useCallback( async () => {
        try{
            const fetched = await request('/api/room/invited','GET',null,{Authorization: `Bearer ${token}`})
            set_I_Rooms(fetched)

            console.log(fetched,'bbbbbbbbbbbbbbbbbb')

        }catch(e){
            console.log(e)
        }
    },[token,request])

    //console.log(rooms,'aaaaaaaaaaaaaaaaa')

    useEffect (() => {
        fetch_O_Rooms()
        fetch_I_Rooms()
    },[fetch_O_Rooms,fetch_I_Rooms])

    if(loading){
        return<div>Loading....</div>
    }

    return (
        <div>

            <RoomCreateDiv/>
            
            <RoomRemoveDiv/>

            <h1>MainPage</h1>
            {/* 1st variable is the one being sent 2nd is the one it is being set to  */}
            <RoomArrayDiv o_rooms = {o_rooms} i_rooms = {i_rooms}/> 

        </div>
    )
}


//for 28.may - add delete room div and leave room div 
//delete create room link and move room creation to 
//top of home page

//CLEAN UP WRITE , go through all code , WRITE BETTER COMMENTS
