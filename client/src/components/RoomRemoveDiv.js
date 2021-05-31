
import React, {useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'

export const RoomRemoveDiv = () => {

    const {request} = useHttp() 
    const [remRoomId, setRemRoomId] = useState('')
    const auth = useContext(AuthContext) //has token 
    
    const deleteRoomHandler = async event => { 
        try{

            console.log(remRoomId,'- room id in handler')

            await request('/api/room/delete_my_room','POST',{received_room_id:remRoomId},
             {Authorization:`Bearer ${auth.token}`
            })
            
            console.log('BONKED')

        }catch(e){
            
        }
    }

    const leaveRoomHandler = async event => { 
        try{

            console.log(remRoomId,'- room id in handler')

            await request('/api/room/leave_room','POST',{received_room_id:remRoomId},
             {Authorization:`Bearer ${auth.token}`
            })
            
            console.log('BONKED')

        }catch(e){
            
        }
    }

    return (
        <div style={{padding: '0rem 2rem'}}>

                <p> Remove room : </p>
                <div>
                    <div class="input-group">
                    <input 
                    type="String" 
                    value={remRoomId}
                    class="form-control" 
                    placeholder="Input room id" 
                    onChange={z => setRemRoomId(z.target.value)}
                    />

                    <button class="btn btn-outline-secondary" id="b1" type="button" 
                    onClick={leaveRoomHandler}
                    //onClick={() => {inviteHandler(); refreshPage()}}
                    >Leave</button>

                    <button class="btn btn-outline-secondary" id="b2" type="button"
                    onClick={deleteRoomHandler}
                    //onClick={() => {kickHandler(); refreshPage()}}
                    >Delete</button>
                    
                    </div>
                </div>
            <br/>
        </div>
    )
}