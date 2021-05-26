
import React,{useState,useEffect,useContext,useCallback} from 'react'
import {useParams} from 'react-router-dom'

import {useHttp} from '../hooks/http.hook'

import {AuthContext} from '../context/AuthContext'

import{RoomDiv} from '../components/RoomDiv'

import {NoteArrayDiv} from '../components/NoteArrayDiv'

export const NoteRoom = () => {



    const {token} = useContext(AuthContext) // to authorize
    const {request,loading} = useHttp()
    const [room,setRoom] = useState()
    const roomId = useParams().id  
    const [notes, setNotes] = useState([])
    //got named in route in App.js   (/note_room/:id) returns id of note room



    const [startDate, setStartDate] = useState(new Date());

    //id of room is gathered using useParams and stored as roomId here
    //need to check how it is absorbed in backend *************************************

    const getRoom = useCallback( async () => {
        try {
            const fetched = await request(`/api/room/one/${roomId}`,'GET',null,{Authorization: `Bearer ${token}`})
            // gets 1 room by id... need authorization because in room.routes authM is added to this route
            setRoom(fetched) //fetched = room

            //console.log(room,'asdasdasdasda')

        }catch (e) {
            console.log(e)
        }
    },[token,roomId,request]) //dependencies are variables and functions that are implemented oputside of callBack but used inside of it 

    useEffect(() =>{
        getRoom()
    },[getRoom])

    const fetchNotes = useCallback( async () => {
        try{
            const fetched = await request(`/api/note/${roomId}`,'GET',null,{Authorization: `Bearer ${token}`})
            setNotes(fetched)

            console.log(fetched,'aaaaaaaaaaaaaaaaa')

        }catch(e){
            console.log(e)
        }
    },[token,request])

    //console.log(rooms,'aaaaaaaaaaaaaaaaa')

    useEffect (() => {
        fetchNotes()
    },[fetchNotes])

    

    if(loading && !room){
        return(
            //make this into component and return it on every loading
        <div class="spinner-border" role="status">
        <span class="visually-hidden"></span>
        </div>
        )
    }

    console.log(room)

    return (
        <div>
            <h1>NoteRoom</h1>
            <RoomDiv room ={room}/>
            <p>----------------------</p>
            <NoteArrayDiv notes = {notes}/>
            
        </div>
    )
}