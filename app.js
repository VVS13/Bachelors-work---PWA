console.log('App!')

const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
// in '' is prefix for future path
app.use('/api/auth',require('./routes/auth.routes'))
app.use('/api/room', require('./routes/room.routes'))
app.use('/api/info', require('./routes/info.routes'))
app.use('/api/note', require('./routes/note.routes'))

//app.use(express.json()) //built in express
//app.use(bodyParser.json())  //great just had to move it higher sadbfgkjasbdgkjhvb
//app.use(bodyParser.urlencoded({ extended: true }));



const PORT = config.get('port') || 5000

async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(PORT, () => console.log(`App has been started  ${PORT}...`))
    } catch(e){
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()

