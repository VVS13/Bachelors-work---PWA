
import  React from 'react';

import {Link} from 'react-router-dom'

import {useHttp} from '../hooks/http.hook'


export const RoomArrayDiv = ({rooms}) =>{

    
    const {loading} = useHttp()
    
    if(!rooms.length) {
        return <p className="container">You have no note rooms...</p>
    }

    return (
    <div class="container">
    <div class="row justify-content-md-center bg-warning" >

        {rooms.map((room)=>{
            return (
                <React.Fragment  key={room._id}>
                <Link to={`/note_room/${room._id}`}>
                <div class="p-3 mb-2 col-lg-5 bg-light" style={{margin: '0rem 2rem'}}>
                    Room name: {room.room_name}
                    <br/>
                    Room id: {room._id}
                    <br/>
                </div>
                </Link>
                </React.Fragment>

            )
        })}
        
        
    </div>
    <br/>
  </div>
  
  
    
    




    )
}