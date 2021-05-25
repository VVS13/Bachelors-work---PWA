
import React,{useState,useEffect,useContext,useCallback} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'

import {AuthContext} from '../context/AuthContext'

import{RoomDiv} from '../components/RoomDiv'

export const NoteRoom = () => {



    const {token} = useContext(AuthContext) // to authorize
    const {request,loading} = useHttp()
    const [room,setRoom] = useState()
    const roomId = useParams().id  
    //got named in route in App.js   (/note_room/:id) returns id of note room

    const getRoom = useCallback( async () => {
        try {
            const fetched = await request(`/api/room/${roomId}`,'GET',null,{Authorization: `Bearer ${token}`})
            // gets 1 room by id... need authorization because in room.routes authM is added to this route
            setRoom(fetched) //fetched = room

            //console.log(room,'asdasdasdasda')

        }catch (e) {
            console.log(e)
        }
    },[token,roomId,request])

    useEffect(() =>{
        getRoom()
    },[getRoom])

    

    if(loading && !room){
        return<div>Loading....</div>
    }

    console.log(room)

    return (
        <div>
            <h1>NoteRoom</h1>
            <RoomDiv room ={room}/>
            
        </div>
    )
}