import  React from 'react';

//import {useHttp} from '../hooks/http.hook'


export const NoteArrayDiv = ({notes}) =>{

    
    //const {loading} = useHttp()
    
    if(!notes.length) {
        return <p className="container">You have no notes...</p>
    }

    return (
    <div class="container">
    <div class="row justify-content-md-center bg-warning" >

        {notes.map((note)=>{
            return (
                <React.Fragment  key={note._id}>
                <div class="p-3 mb-2 col-lg-5 bg-light"style={{margin: '0.5rem 0.5rem'}} > 
                    Created: {note.note_creation_time}
                    <br/>
                    Due: {note.note_due_time}
                    <br/>
                    Deletion: {note.note_deletion_time}
                    <br/>
                    Name: {note.note_name}
                    <br/>
                    Text: {note.note_text}
                    <br/>
                    Note id : {note._id}
                    {/* room of note: {note.room_of_note} */}
                    <br/>

                </div>
                </React.Fragment>
            )
        })}
    </div>
    </div>
    

    )
}