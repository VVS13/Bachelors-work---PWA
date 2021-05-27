
import React,{useState,useEffect,useContext,useCallback} from 'react'
import {useParams} from 'react-router-dom'

import {useHttp} from '../hooks/http.hook'

import {AuthContext} from '../context/AuthContext'

import{RoomInfoDiv} from '../components/RoomInfoDiv'

import {NoteArrayDiv} from '../components/NoteArrayDiv'
import { AddNoteDiv } from '../components/AddNoteDiv'
import { InviteToRoomDiv } from '../components/InviteToRoomDiv'

export const NoteRoom = () => {



    const {token} = useContext(AuthContext) // to authorize
    const {request,loading} = useHttp()
    const [room,setRoom] = useState()
    const roomId = useParams().id  
    const [isAdmin,setIsAdmin] = useState() 
    const [notes, setNotes] = useState([])
    //got named in route in App.js   (/note_room/:id) returns id of note room

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
    },[token,roomId,request])

    useEffect (() => {
        fetchNotes()
    },[fetchNotes])

    const fetchAdmin = useCallback( async () => {
        try{
            const fetched = await request(`/api/note/is_admin/${roomId}`,'GET',null,{Authorization: `Bearer ${token}`})
            setIsAdmin(fetched)

            //console.log(fetched,'fetched admin bool result') //correct

        }catch(e){
            console.log(e)
        }
    },[token,request,roomId])

    //console.log(rooms,'aaaaaaaaaaaaaaaaa')

    useEffect (() => {
        fetchAdmin()
    },[fetchAdmin])

    //console.log(isAdmin," ? is admin ?")  //it is passed to here ... all correct

    if(loading && !room && !isAdmin){
        return(
            //make this into component and return it on every loading
        <div class="spinner-border" role="status">
        <span class="visually-hidden"></span>
        </div>
        )
    }

    console.log(room,' - returns current room info after inviting')

    return (
        <div>
            {/* can put false to see what non admin user will see  */}
            {isAdmin===true &&  
                <div>
                    <p>----------------------</p>
                        <AddNoteDiv room ={room}/> 
                    <p>----------------------</p>
                        <p>Invite/delete person by username fild with button</p>
                        <InviteToRoomDiv room = {room}/>
                    <p>----------------------</p>
                        <p>Invited people Array displayed as string(Array of usernames)</p>
                    <p>----------------------</p>
                </div> 
            }
                <RoomInfoDiv room ={room}/> 
            <p>----------------------</p>
                <NoteArrayDiv notes = {notes}/>
            
        </div>
    )
}