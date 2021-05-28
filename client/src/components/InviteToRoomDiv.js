
import React,{useState} from 'react'

import {useHttp} from '../hooks/http.hook'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'


export const InviteToRoomDiv = ({ room }) => {

const {request} = useHttp() 
const auth = useContext(AuthContext) 
const [username, setUsername] = useState('')


const inviteHandler = async event => { 
    //on click event , need to use async if i want to use await
    try{

        console.log(username,'- username in handler')

        await request(`/api/room/invite_user/${room._id}`,'POST',{received_username:username},
            {Authorization:`Bearer ${auth.token}`
        }) 

        console.log('NOICE')

    }catch(e){
        
    }
}

const kickHandler = async event => { 
    //on click event , need to use async if i want to use await
    try{

        console.log(username,'- username in handler')

        await request(`/api/room/kick_user/${room._id}`,'POST',{received_username:username},
            {Authorization:`Bearer ${auth.token}`
        }) 

        console.log('SADGE')

    }catch(e){
        
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
        value={username}
        class="form-control" 
        placeholder="Input username" 
        onChange={z => setUsername(z.target.value)}
        />
        <button class="btn btn-outline-secondary" id="b1" type="button" 
        onClick={() => {inviteHandler(); refreshPage()}}>
            Invite</button>
        <button class="btn btn-outline-secondary" id="b2" type="button"
        onClick={() => {kickHandler(); refreshPage()}}>
            Kick</button>
        </div>
    </div>
)


}
