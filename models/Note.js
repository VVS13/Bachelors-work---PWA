const {Schema, model, Types} = require('mongoose')

const schema = new Schema({

    note_name: {type: String, required: true},

    

    //writer: {type: Types.ObjectId, ref: 'User', required: true}, 
    //assuming only creator of the room will be able to create notes

    //who_can_see: [{type: Types.ObjectId, ref: 'User'}],
    //assuming that people that are invited, can see notes, can only read

    room_of_note: {type: Types.ObjectId, ref: 'Room'}, //may turn out that it is not needed

})

module.exports = model('Note', schema)