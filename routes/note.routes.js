const {Router} = require('express')

const Note = require('../models/Note')
const Room = require('../models/Room')

const authM = require('../middleware/auth.middleware')
//const config = require('config') // for base url

const ObjectId = require('mongodb').ObjectID

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


        res.json(note)


    }catch (e){
        console.log(e)
        res.status(500).json({message: 'Something went wrong, try again'})
    }

})

router.get('/:id',authM, async (req, res) => {
    try{

        console.log('-----------------------------------')

        const not_checked_notes = await Note.find({room_of_note: req.params.id}) 

        const today = new Date()

        const notes_to_delete = []
        //console.log(' hellooo')  

        async function delteDatNote(idd) {
            await Note.findOneAndDelete({_id: idd}).exec()
        }

        const notes = not_checked_notes.map((note) => {

            //console.log(today,' - comparison - ', note.note_deletion_time)

            const statement = today > note.note_deletion_time
            //returns bool true or false 
            //if true then note needs to be deleted

            if(statement){
                //checks if statement is true

                console.log('we in here')

                console.log(statement , note.note_name)

                delteDatNote(note._id)

                return null;
                
            }

            return note

        }).filter(note => note != null)

        console.log(notes,' - the array')  

        res.json(notes)
        //returns array of notes that needs to be displayed using map in note room

    }catch (e){
        console.log(e)
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

router.post('/delete_note/:id',authM,async (req, res) => {
    try{

        console.log('-----------------------------------------------------------')
        const {received_note_id} = req.body //string id

        //const current_room = await Room.findOne({_id: req.params.id}) 

        //const all_notes_of_room = await Note.find({room_of_note:req.params.id})

        await Note.findOneAndDelete({$and : [{_id: ObjectId(received_note_id)},{room_of_note:req.params.id}]})
        //check so user can delete notes that are only in room he is in right now
        //room of note is equal to parameter id in link 
        //from front end id is sent as string so need to cast it to ObjectId type for checking

        //console.log(note_to_delete, ' - yep this note found') // this check works

        res.status(201).json({message: 'Note has been deleted!'})

    }catch (e){
        res.status(400).json({message: 'Wrong note id inputed...'})
    }

})





router.post('/note_expired/',async (req, res) => {
    try{

        console.log('-----------------------------------------------------------')
        const {received_note_id} = req.body //string id

        console.log(typeOf(received_note_id),' - the type received')

        //const current_room = await Room.findOne({_id: req.params.id}) 

        //const all_notes_of_room = await Note.find({room_of_note:req.params.id})

        await Note.findOneAndDelete({_id: ObjectId(received_note_id)})
        //check so user can delete notes that are only in room he is in right now
        //room of note is equal to parameter id in link 
        //from front end id is sent as string so need to cast it to ObjectId type for checking

        //console.log(note_to_delete, ' - yep this note found') // this check works

        res.status(201).json({message: 'Note has been deleted!'})

    }catch (e){
        res.status(400).json({message: 'Wrong note id inputed...'})
    }

})

module.exports = router