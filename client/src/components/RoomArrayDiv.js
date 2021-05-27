
import  React from 'react';

import {Link} from 'react-router-dom'

export const RoomArrayDiv = ({o_rooms,i_rooms}) =>{
    
    if(!o_rooms.length && !i_rooms.length) {
        return <p className="container"><br/>You don't note rooms...<br/></p>
    }

    return (
    <div class="container">
    <div class="row justify-content-md-center bg-warning" >

        {o_rooms.map((room)=>{
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
        <p><br/>Rooms that I have been invited to<br/></p>
        {i_rooms.map((room)=>{
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