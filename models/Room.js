const {Schema, model, Types} = require('mongoose')

const schema = new Schema({

    room_name: {type: String, required: true},

    owner: {type: Types.ObjectId, ref: 'User', required: true}, 
    //assuming only creator of the room will be able to create notes

    invited: [{type: Types.ObjectId, ref: 'User'}],
    //assuming that people that are invited, can see notes, can only read

    notes: [{type: Types.ObjectId, ref: 'Note'}],

})

module.exports = model('Room', schema)