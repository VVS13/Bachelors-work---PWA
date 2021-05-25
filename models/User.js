const {Schema, model, Types} = require('mongoose')

const schema = new Schema({

    username: {type: String, required: true, unique: true},
    
    password: {type: String, required: true},

    note_rooms: [{type: Types.ObjectId, ref: 'Room'}]

})

module.exports = model('User', schema)