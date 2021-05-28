
import React, {useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'

export const RoomRemoveDiv = () => {

    const {request} = useHttp() 
    const [remRoomId, setRemRoomId] = useState('')
    const auth = useContext(AuthContext) //has token 
    
    // const createRoomHandler = async event => { 
    //     try{

    //         const data = await request('/api/room/create_room','POST',{room_name},
    //          {Authorization:`Bearer ${auth.token}`
    //         }) 



    //     }catch(e){
            
    //     }
    // }

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

                    //onClick={() => {inviteHandler(); refreshPage()}}
                    >
                        Leave</button>
                    <button class="btn btn-outline-secondary" id="b2" type="button"

                    //onClick={() => {kickHandler(); refreshPage()}}
                    >
                        Delete</button>
                    </div>
                </div>
            <br/>
        </div>
    )
}