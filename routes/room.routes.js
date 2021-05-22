const {Router} = require('express')

const Room = require('../models/Room')

const authM = require('../middleware/auth.middleware')
//const config = require('config') // for base url

const router = Router()

router.post('/create_room',authM,async (req, res) => {
    //added authM so non authentificated users could not create rooms
    //and I could identify user through it by getting id
    try{

        
        const {room_name} = req.body

        //maybe need to asign and generate unique in app link for room

        //const baseUrl = config.get('baseUrl') 

        const room = new Room ({
            room_name,owner: req.user.userId
        })

        await room.save()

        res.status.json({room})

    }catch (e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }

})

router.get('/',authM, async (req, res) => {
    try{
        //needed to create middleware to check if user is authorized or not
        //if he is we can get users id through token that was saved 
        const rooms = await Room.find({owner: req.user.userId}) 
        //can request user through authM because it decodes token and toke holds user id

        //will find all rooms by owner
        //need also to find them by user if he is in invited array of room


        
        res.json(rooms)
    }catch (e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.get('/:id',authM, async (req, res) => {
    //so not authenticated user could not get to room by id
    try{
        const room = await Room.findById(req.params.id)
        res.json(room)

    }catch (e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

module.exports = router