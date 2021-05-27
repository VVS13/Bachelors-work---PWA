
import React from 'react'

import "react-datepicker/dist/react-datepicker.css";
export const RoomInfoDiv = ({ room }) => {

    if(!room){
        return<div>Loading....</div>
    }

    return (
        <div> 
            <h1>Room: <strong>{room.room_name}</strong> </h1>
            <h6>Room id: <strong>{room._id}</strong> </h6>
        </div>

    )
}