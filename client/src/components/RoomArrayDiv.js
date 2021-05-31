
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
                <div class="p-3 mb-2 col-lg-3 bg-light" style={{margin: '0rem 2rem'}}>
                    <Link to={`/note_room/${room._id}`}>
                    <div>
                        Room name: {room.room_name}
                    </div>
                    </Link>
                    <div>
                        <br/>Room id: <br/>{room._id}
                    </div>
                </div>
                
                </React.Fragment>
            )
        })}
    </div>
    <div class="row justify-content-md-center bg-warning text-center" >
        <div >
        <p><br/>Rooms that I have been invited to<br/></p>
        </div>
    </div>
    <div class="row justify-content-md-center bg-warning" >
        
        {i_rooms.map((room)=>{
            return (
                <React.Fragment  key={room._id}>
                <div class="p-3 mb-2 col-lg-3 bg-light" style={{margin: '0rem 2rem'}}>
                    <Link to={`/note_room/${room._id}`}>
                    <div>
                        Room name: {room.room_name}
                    </div>
                    </Link>
                    <div>
                        <br/>Room id: <br/>{room._id}
                    </div>
                </div>
                </React.Fragment>
            )
        })}
        
        
    </div>
    <br/>
  </div>
  
  
    
    




    )
}