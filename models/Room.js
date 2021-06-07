
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({

    room_name: {type: String, required: true},
    //Room name for information purposes

    owner: {type: Types.ObjectId, ref: 'User', required: true}, 
    //Id of user who creates this note room will be saved

    invited: [{type: String}],
    //Will hold user usernames which also are unique as ID's


})

module.exports = model('Room', schema)


