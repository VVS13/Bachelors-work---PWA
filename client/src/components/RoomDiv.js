
import React from 'react'



export const RoomDiv = ({ room }) => {
    if(!room){
        return<div>Loading....</div>
    }
    return (
        //use collor make square make it adjustable to screen size maybe 3 columns
        <div> 
            {/* here add an if cycle .. if user is admin display note creation div and deletion div */}

            <h1>Room: <strong>{room.room_name}</strong> </h1>
            <h6>Room id: <strong>{room._id}</strong> </h6>
            
            <div>
                {/* here display all notes of coresponding room using map */}
            </div>
            
        </div>

    )
}