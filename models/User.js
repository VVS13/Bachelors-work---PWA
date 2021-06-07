
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({

    username: {type: String, required: true, unique: true},
    //stores username as Sting type.... does not allow users to have same usernames
    
    password: {type: String, required: true},
    //stores hashed pasword with 12x salt

})

module.exports = model('User', schema)


