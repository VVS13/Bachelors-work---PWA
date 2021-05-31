import React,{useState} from 'react'

import {useHttp} from '../hooks/http.hook'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'


export const DeleteNoteDiv = ({ room }) => {

const {request} = useHttp() 
const auth = useContext(AuthContext) 
const [note_id, setNoteId] = useState('')


const deleteNoteHandler = async event => { 
    //on click event , need to use async if i want to use await
    try{

        console.log(' zzzzzzzzz')

        await request(`/api/note/deleteNote/${room._id}`,'POST',{received_note_id:note_id},
            {Authorization:`Bearer ${auth.token}`
        }) 

        console.log('Ez delete note request')

    }catch(e){
        console.log(e)
    }
}

function refreshPage() {
    window.location.reload(false); //deprecated
} 

return(
    <div>
        <div class="input-group">
        <input 
        type="String" 
        value={note_id}
        class="form-control" 
        placeholder="Note id" 
        onChange={z => setNoteId(z.target.value)}
        />
        <button class="btn btn-outline-secondary" id="b1" type="button" 
        onClick={deleteNoteHandler}  // this one for testing 
        //onClick={() => {inviteHandler(); refreshPage()}}
        >
            Delete</button>
        </div>
    </div>
)


}