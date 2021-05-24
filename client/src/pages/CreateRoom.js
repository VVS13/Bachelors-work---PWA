
import React, {useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreateRoom = () => {

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
            //api to perform/method that is being used/data needed for api, gathered using value field

            //console.log(data._id)
            //console.log(data.room)
            
            history.push(`/note_room/${data._id}`)

            //console.log(data)

        }catch(e){
            
        }
    }

    return (
        <div style={{padding: '1rem 2rem'}}>

            <h1>CreateRoom</h1>

            <br/>

            <h2>Delete selected room</h2>
            <select class="form-control form-control-lg">
                <option>-------------</option>
                <option>1111111111111</option>
                <option>2222222222222</option>
                <option>3333333333333</option>
            </select>

            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
            <label class="form-check-label" for="defaultCheck1">
                Are you sure you want to delete this room?
            </label>
            </div>
            <div className="col">

                <button className="btn btn-danger container-fluid "
                type="submit" 
                >DELETE</button>

            </div>

            <br/>

            <p>----------------------------------------</p>
            <h2>Create room</h2>
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
            </div>

            <br/>

            <p>----------------------------------------</p>
            <h2>Join room</h2>
            <h6>Input room id or room time key</h6>
            <div>
                <input className="form-control p-3"
                type="text" 
                id="add_room"  
                name="add_room"
                ></input>
                <br/>
            </div>


            <div>
                <button className="btn btn-success container-fluid "
                type="submit" 
                >Enter</button>
            </div>

            <br/>





        </div>
    )
}