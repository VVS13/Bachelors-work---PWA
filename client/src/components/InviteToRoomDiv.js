
import React,{useState} from 'react'

import {useHttp} from '../hooks/http.hook'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'


export const InviteToRoomDiv = ({ room }) => {

function refreshPage() {
    window.location.reload(false); //deprecated
} 
    
const {request} = useHttp() 
const auth = useContext(AuthContext) 

return(
    <div>
        <div class="input-group">
        <input 
        type="String" 
        class="form-control" 
        placeholder="Input username" 
        />
        <button class="btn btn-outline-secondary" id="b1" type="button">
            Invite</button>
        <button class="btn btn-outline-secondary" id="b2" type="button">
            Kick</button>
        </div>
    </div>

    

)


}
