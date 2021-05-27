
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

    const [creationDate, setCreationDate] = useState(new Date());
    //const f_creationDate = format(creationDate,'dd-MM-yyyy')

    const [dueDate, setDueDate] = useState(null);
    //console.log(dueDate)\
    //const f_dueDate = format(dueDate,'dd-MM-yyyy')

    const [deletionDate, setDeletionDate] = useState(null);

    const [new_note_name, setNewNoteName] = useState('')
    const [new_note_text, setNewNoteText] = useState('')
    
    //make other dates unavailable that are before tomorrow

    //console.log(f_creationDate)


    const {request} = useHttp() 
    const auth = useContext(AuthContext) //has token 
    //const history = useHistory()

    function refreshPage() {
        window.location.reload(false); //deprecated
    } 

    //will use after action has been performed by any handler

    //deprecated


    const createNoteHandler = async event => { 
        try{

            console.log(room._id,'1')
            console.log(new_note_name,'2')
            console.log(new_note_text,'3')
            console.log(creationDate,'4')
            console.log(deletionDate,'5')
            console.log(dueDate,'6')
            console.log(new Date(),'7')

            if(creationDate!=null){
                const f_creationDate = format(creationDate,'dd-MM-yyyy')
                console.log(f_creationDate,'123')
            }
            

            
            

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
                        placeholderText="Deletion date" 
                        />
                        <p>Created @:{format(creationDate,'dd-MM-yyyy').toString()}</p>
                    </div>

                    <div class="col">
                        <DatePicker 
                        dateFormat="dd/MM/yyyy"
                        selected={dueDate} 
                        onChange={date => setDueDate(date)}
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
                        //includeDates={[new Date(), (new Date(),1)]}
                        placeholderText="Deletion date" 
                        />
                        {!deletionDate && <p>Deleted @: No deletion Date</p>}
                        {deletionDate && <p>Deleted @:{format(deletionDate,'dd-MM-yyyy').toString()}</p>}
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
                        Add new note
                    </button>
                </div>
                
            </div>
            
        </div>

    )
}