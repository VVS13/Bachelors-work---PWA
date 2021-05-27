const {Router,Date} = require('express')

const Note = require('../models/Note')
const Room = require('../models/Room')

const authM = require('../middleware/auth.middleware')
//const config = require('config') // for base url

const router = Router()

router.post('/create_note/:id',authM,async (req, res) => {

    try{

        const {name} = req.body

        console.log(name,'11')

        const {text} = req.body

        const {creation_time} = req.body

        // if(creation_time!=null){
        //     creation_time = format(creation_time,'dd-MM-yyyy')
        // }

        const {deletion_time} = req.body

        const {due_time} = req.body

        const note = new Note ({
            note_name: name,
            note_text:text,
            note_creation_time:creation_time,
            note_deletion_time:deletion_time,
            note_due_time:due_time,
            room_of_note: req.params.id   
            //should pass id from link...
            //that is id of room where it is being created
        })

        await note.save() 

        console.log(note," - whole note (checked in backend note.routes)")

        console.log(note._id," - id of new note(checked in backend note.routes)")


        res.json(note)


    }catch (e){
        console.log(e)
        res.status(500).json({message: 'Something went wrong, try again'})
    }

})

router.get('/:id',authM, async (req, res) => {
    try{

        const notes = await Note.find({room_of_note: req.params.id}) 

        res.json(notes)
        //returns array of notes that needs to be displayed using map in note room

    }catch (e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})


//    `/api/note/is_admin/${roomId}`
router.get('/is_admin/:id',authM, async (req, res) => {
    try{
        
        const current_room = await Room.findOne({_id: req.params.id}) 
        const owner_of_current_room = current_room.owner
        const curent_user = req.user.userId

        //console.log(current_room,' - 111 ')
        //console.log(curent_user,' - 222')
        //console.log(owner_of_current_room,' - 333')
        
        var is_admin = false

        if(owner_of_current_room==curent_user){
            is_admin = true
        }

        //console.log(is_admin,' admin info after if cycle')   //gives right output here

        res.json(is_admin)

    }catch (e){
        console.log(e)
    }
})

module.exports = router