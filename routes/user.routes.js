const {Router} = require('express')

const Room = require('../models/Room')

const User = require('../models/User')

const authM = require('../middleware/auth.middleware')
//const config = require('config') // for base url

const router = Router()

router.get('/add_to_rooms',authM, async (req, res) => {
    try{


        const rooms = await Room.find({owner: req.user.userId}) 

        
        res.json(rooms)
    }catch (e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/update_user_rooms',authM, async (req, res) => {
    try{

        const rooms_where_owner = await Room.find({owner: req.user.userId})
        
        const toUpdate = await User.findOneAndUpdate({_id: req.user.userId}, updates, {note_rooms:rooms_where_owner}) 


        
        res.json(rooms)
    }catch (e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})