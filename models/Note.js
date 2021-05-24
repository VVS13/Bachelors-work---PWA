const {Schema, model, Types} = require('mongoose')

const schema = new Schema({

    note_name: {type: String, required: true},


    note_creation_time: {type: Date, required: true},
    //{new Date(note.date).toLocaleDateString()}

    note_deletion_time: {type: Date, required: true},

    note_due_time: {type: Date}, //may be date or may be text

    //writer: {type: Types.ObjectId, ref: 'User', required: true}, 
    //assuming only creator of the room will be able to create notes

    //who_can_see: [{type: Types.ObjectId, ref: 'User'}],
    //assuming that people that are invited, can see notes, can only read

    room_of_note: {type: Types.ObjectId, ref: 'Room'}, //may turn out that it is not needed

})

module.exports = model('Note', schema)