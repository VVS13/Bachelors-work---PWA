const {Router,Date} = require('express')

const Note = require('../models/Note')

const authM = require('../middleware/auth.middleware')
//const config = require('config') // for base url

const router = Router()

router.post('/create_note',authM,async (req, res) => {

    try{

        const {name} = req.body

        const {text} = req.body

        //const {creation_time} = {new Date(note.date).toLocaleDateString()}

        const note = new Note ({
            note_name: name, note_text:text
        })


        //console.log(room) // ok output but no room name 

        await room.save() 
        //is not saveing probably becasue room name is required but not imputed
        res.json(room)


    }catch (e){
        console.log(e)
        res.status(500).json({message: 'Something went wrong, try again'})
    }

})

router.get('/',authM, async (req, res) => {
    try{
        //needed to create middleware to check if user is authorized or not
        //if he is we can get users id through token that was saved 
        const rooms = await Room.find({owner: req.user.userId}) 

        //const user1 = await User.find({_id: req.user.userId})

        // const user = user({
        //     _id: req.user.userId,
        //     username: req.user.username,
        //     password: req.user.password,
        //     note_rooms: rooms

        // })



        //can request user through authM because it decodes token and toke holds user id

        //will find all rooms by owner

        //need also to find them by user if he is in invited array of room...


        
        res.json(rooms)
    }catch (e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

module.exports = router