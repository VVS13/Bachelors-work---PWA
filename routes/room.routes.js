const {Router} = require('express')

const Room = require('../models/Room')
const User = require('../models/User')

const authM = require('../middleware/auth.middleware')
//const config = require('config') // for base url

const router = Router()

router.post('/create_room',authM,async (req, res) => {
    //added authM so non authentificated users could not create rooms
    //and I could identify user through it by getting id
    try{

        //console.log(req.body,'11')

        const {room_name} = req.body

        //maybe need to asign and generate unique in app link for room

        //const baseUrl = config.get('baseUrl') 

        const room = new Room ({
            room_name , owner: req.user.userId
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

router.get('/owner/',authM, async (req, res) => {
    try{
        //needed to create middleware to check if user is authorized or not
        //if he is we can get users id through token that was saved 
        const rooms = await Room.find({owner: req.user.userId}) 
        //returns rooms where current user is owner


        //can request user through authM because it decodes token and toke holds user id

        //will find all rooms by owner

        //need also to find them by user if he is in invited array of room...


        
        res.json(rooms)
    }catch (e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.get('/invited/',authM, async (req, res) => {
    try{
        //needed to create middleware to check if user is authorized or not
        //if he is we can get users id through token that was saved 
        const rooms = await Room.find({invited: {$all:[req.user.userId]}}) 
        //returns rooms where invited array of room has current loged user, in it 

        //can request user through authM because it decodes token and toke holds user id

        //need also to find them by user if he is in invited array of room...


        
        res.json(rooms)
    }catch (e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})



router.get('/one/:id',authM, async (req, res) => {

    //in frontend after room creation coresponding id of new room is put in link field
    //because of that it can be gathered as param
    //so not authenticated user could not get to room by id
    try{

        //req params id lets gather id of 
        const room = await Room.findById(req.params.id)
        res.json(room)

    }catch (e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/invite_user/:id',authM,async (req, res) => {
    try{
        const {received_username} = req.body
        const user_found = await User.findOne({username:received_username})
        const current_room = await Room.findById(req.params.id)

        //if user does not exist  or   is admin of current room
        if(!user_found && user_found._id != current_room.owner){
            res.status(400).json({message:'User does not exist...'})
        }

        //probably wrong syntax
        const already_invited = await current_room.findOne({invited: {$all:[received_username]}})

        if(already_invited){
            res.status(400).json({message:'User already invited...'})
        }

        

        res.status(200).json({message: 'User invited succesfuly!'})

    }catch (e){
        console.log(e)
        res.status(500).json({message: 'Something went wrong, try again'})
    }

})



module.exports = router