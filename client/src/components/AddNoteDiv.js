
import React,{useState} from 'react'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { format } from 'date-fns' //compareAsc


//import{createNoteDiv} from '../components/createNoteDiv'


import {useHttp} from '../hooks/http.hook'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
//import {useHistory} from 'react-router-dom'

export const AddNoteDiv = ({ room }) => {

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const [creationDate, setCreationDate] = useState(today);
    //date when note has been created

    const [dueDate, setDueDate] = useState(null);
    //informative field for users with due date - 
    //- till which the assignment certified in note needs to be complete

    const [deletionDate, setDeletionDate] = useState(tomorrow);
    //date till which note exists - 
    //after today date becomes bigger than deletion date - note is deleted


    const [new_note_name, setNewNoteName] = useState('')
    //setting note name

    const [new_note_text, setNewNoteText] = useState('')
    //setting note tex/ asignment information


    const {request} = useHttp() 

    const auth = useContext(AuthContext) //has token also holds id

    function refreshPage() {
        window.location.reload(false); //deprecated
    } 
    //will be used to refresh the page after request for note creation has been sent
    //to display it instantly 

    const createNoteHandler = async event => { 
        try{

            const data = await request(`/api/note/create_note/${room._id}`,'POST',
                {name:new_note_name,
                text: new_note_text,
                creation_time: creationDate,
                deletion_time: deletionDate,
                due_time: dueDate
                },
             {Authorization:`Bearer ${auth.token}`
            }) 
            
            console.log(data.note_name,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

        }catch(e){
            
        }
    }

    if(!room){
        return<div>Loading....</div>
    }

    return (
        //use collor make square make it adjustable to screen size maybe 3 columns
        <div> 
            {/* here add an if cycle .. if user is admin display note creation div and deletion div */}
            <div> {/* // this is note creation div */}
                <div class="input-group mb-3">
                <input 
                class="form-control" 
                placeholder="Set name of new note" 
                type="String" 
                id="new note name"  
                name="new note name"
                value={new_note_name}
                onChange={y => setNewNoteName(y.target.value)}
                />
                </div>
                <div class="row"> 
                    <div class="col">
                        <DatePicker 
                        dateFormat="dd/MM/yyyy"
                        selected={creationDate} 
                        onChange={date => setCreationDate(date)}
                        //includeDates={[new Date(), (new Date(),1)]}
                        disabled
                        placeholderText="Creation date" 
                        />
                        <p>Created @:{format(creationDate,'dd-MM-yyyy').toString()}</p>
                    </div>

                    <div class="col">
                        <DatePicker 
                        dateFormat="dd/MM/yyyy"
                        selected={dueDate} 
                        onChange={date => setDueDate(date)}
                        minDate={tomorrow}
                        maxDate={deletionDate}
                        //includeDates={[new Date(), (new Date(),1)]}
                        placeholderText="Due date" 
                        />
                        {!dueDate && <p>Due @: Not specified</p>}
                        {dueDate && <p>Due @:{format(dueDate,'dd-MM-yyyy').toString()}</p>}
                    </div>
                    
                    <div class="col">
                        <DatePicker 
                        dateFormat="dd/MM/yyyy"
                        selected={deletionDate} 
                        onChange={date => setDeletionDate(date)}
                        minDate={tomorrow}

                        placeholderText="Deletion date"

                        />
                        <p>Deleted @:{format(deletionDate,'dd-MM-yyyy').toString()}</p>
                    </div>
                </div>
                    <div class="input-group mb-3">
                    <input 
                    class="form-control" 
                    placeholder="Set message of new note"
                    type="String" 
                    id="new note text"  
                    name="new note text"
                    value={new_note_text}
                    onChange={x => setNewNoteText(x.target.value)}
                    />
                    <button 
                    class="btn btn-outline-secondary" 
                    type="button" 
                    id="button-addon2"
                    onClick={() => { createNoteHandler() ; refreshPage()}}
                    >
                        Add note
                    </button>
                </div>
                
            </div>
            
        </div>

    )
}