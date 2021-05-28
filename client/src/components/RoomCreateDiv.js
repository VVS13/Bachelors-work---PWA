import React, {useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const RoomCreateDiv = () => {

    const {request} = useHttp() 
    const [room_name, setRoomName] = useState('')
    const auth = useContext(AuthContext) //has token 
    const history = useHistory()
    
    const createRoomHandler = async event => { 
        //on click event , need to use async if i want to use await
        try{

            const data = await request('/api/room/create_room','POST',{room_name},
             {Authorization:`Bearer ${auth.token}`
            }) 
            //from backend res.json(room) is returned
            //which in this case is named data 
            //then we get redirected to 


            //api to perform/method that is being used/data needed for api, gathered using value field

            //console.log(data._id)
            //console.log(data.room)
            
            history.push(`/note_room/${data._id}`)

            //console.log(data)

        }catch(e){
            
        }
    }

    return (
        <div style={{padding: '0rem 2rem'}}>

                <p>Create room : </p>
                <div class="input-group mb-3">
                    <input 
                    class="form-control" 
                    placeholder="Set name of new room"
                    type="String" 
                    id="new room name"  
                    name="room name"
                    value={room_name}
                    onChange={e => setRoomName(e.target.value)}
                    />
                    <button 
                    class="btn btn-outline-secondary" 
                    type="button" 
                    id="crb"
                    onClick={createRoomHandler}
                    >
                        Create room
                    </button>
                </div>

            {/* <h2>Create room</h2>
            <h6>Input room name</h6>
            <div>
                <input className="form-control p-3"
                type="String" 
                id="new room name"  
                name="room name"
                value={room_name}
                onChange={e => setRoomName(e.target.value)}
                ></input>
                <br/>
            </div>


            <div>
                <button className="btn btn-success container-fluid "
                type="submit" 
                onClick={createRoomHandler} //
                >Create</button>
            </div> */}

        </div>
    )
}