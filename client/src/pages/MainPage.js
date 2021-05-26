
import React, {useState,useEffect,useContext,useCallback} from 'react'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {RoomArrayDiv} from '../components/RoomArrayDiv'

export const MainPage = () => {

    const {token} = useContext(AuthContext) // to authorize
    const {loading, request} = useHttp()
    const [rooms, setRooms] = useState([])


    //here we get all rooms in room.routes all info is gathered there 
    const fetchRooms = useCallback( async () => {
        try{
            const fetched = await request('/api/room','GET',null,{Authorization: `Bearer ${token}`})
            setRooms(fetched)

            console.log(fetched,'aaaaaaaaaaaaaaaaa')

        }catch(e){
            console.log(e)
        }
    },[token,request])

    //console.log(rooms,'aaaaaaaaaaaaaaaaa')

    useEffect (() => {
        fetchRooms()
    },[fetchRooms])

    if(loading){
        return<div>Loading....</div>
    }

    return (
        <div>

            <h1>MainPage</h1>
            
            <RoomArrayDiv rooms = {rooms}/>

        </div>
    )
}