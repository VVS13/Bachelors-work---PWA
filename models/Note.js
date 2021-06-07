
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({

    note_name: {type: String, required: true},
    //obligatory field for task name specification

    note_text: {type: String},
    //informative field for task specification

    note_creation_time: {type: Date, required: true},
    //Will hold date of when note was created

    note_deletion_time: {type: Date},
    //will hold date of when note should be deleted

    note_due_time: {type: Date}, 
    //informative date for user task due date specification

    room_of_note: {type: Types.ObjectId, ref: 'Room',required: true}, 
    //Id of room where note got created will be saved 

})
module.exports = model('Note', schema)

