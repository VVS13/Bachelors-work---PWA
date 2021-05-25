const {Router} = require('express')

const Room = require('../models/Room')
const User = require('../models/User')

const authM = require('../middleware/auth.middleware')
//const config = require('config') // for base url

const router = Router()


router.get('/user_info', async (req, res) => {
    try{
        //comand used in browser console 
        //fetch('/api/info/user_info').then(res => res.text()).then(res => console.log(res))
        //to know about set user 
        const user_info = await User.findOne({username:'asd'}).exec()

        res.json(user_info)

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