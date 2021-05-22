import React from 'react'

export const CreateRoom = () => {
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
                type="text" 
                id="new room name"  
                name="room name"
                ></input>
                <br/>
            </div>


            <div>
                <button className="btn btn-success container-fluid "
                type="submit" 
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