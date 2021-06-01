import React,{useState} from 'react'

import {useHttp} from '../hooks/http.hook'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'


export const DeleteNoteDiv = ({ room }) => {

const {request} = useHttp() 
const {token} = useContext(AuthContext) 
const [note_id, setNoteId] = useState('')


const deleteNoteHandler = async event => { 
    //on click event , need to use async if i want to use await
    try{

        console.log(' zzzzzzzzz')

        await request(`/api/note/delete_note/${room._id}`,'POST',{received_note_id:note_id},
            {Authorization:`Bearer ${token}`
        }) 


        console.log('Ez delete note request complete ')

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
        //onClick={deleteNoteHandler}  // this one for testing 
        onClick={() => {deleteNoteHandler(); refreshPage()}}
        >
            Delete</button>
        </div>
    </div>
)


}