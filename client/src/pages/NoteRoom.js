
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

    const [usersInvited, setUsersInvited] = useState([])
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

    

    const fetchInvitedUsers = useCallback( async () => { 
    //on click event , need to use async if i want to use await
        try{

            const fetched = await request(`/api/room/get_invited/${roomId}`,'GET',null,
            {Authorization:`Bearer ${token}`}) 
            setUsersInvited(fetched)

            console.log(fetched,'oh my gaaaaaaaaaah')

        }catch(e){
            
        }
    },[token,request,roomId])

    useEffect (() => {
        fetchInvitedUsers()
    },[fetchInvitedUsers])

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
        <div style={{padding: '1rem 2rem'}}>
            {/* can put false to see what non admin user will see  */}
            {isAdmin===true &&  
                <div class="bg-light border border-warning" style={{padding: '1rem 2rem'}}>
                    <p>----------------------</p>
                        <p>Create/Add new note : </p>
                        <AddNoteDiv room ={room} /> 
                    <p>----------------------</p>
                        <p>Invite/Kick user by username : </p>
                        <InviteToRoomDiv room = {room}/>
                    <p>----------------------</p>
                        <p>Invited users : {usersInvited}</p>
                    <p>----------------------</p>
                </div> 
            }
                <RoomInfoDiv room ={room}/> 
            <p>----------------------</p>
                <NoteArrayDiv notes = {notes}/>
            
        </div>
    )
}