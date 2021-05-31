const {Router} = require('express')

const Room = require('../models/Room')
const User = require('../models/User')

const authM = require('../middleware/auth.middleware')
//const config = require('config') // for base url

const router = Router()

const ObjectId = require('mongodb').ObjectID

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

        const curent_user = await User.findOne({_id:req.user.userId})


        const rooms = await Room.find({invited: curent_user.username})
        //{invited: {$elemMatch: req.user.userId }} 

        

        console.log(rooms ,' - heloooooooooo')

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
// `/api/room/invite_user/${roomId}`
router.post('/invite_user/:id',authM,async (req, res) => {
    try{

        console.log('-----------------------------------------------------------')
        const {received_username} = req.body

        //console.log(received_username,' - received username') // ok 

        const user_found = await User.findOne({username:received_username})
        const current_room = await Room.findById(req.params.id)

        console.log(user_found,' - user found')

        console.log(' EZ')

        //if user does not exist  or   is admin of current room
        if(user_found==null){
            console.log('No such user found')
            res.status(400).json({message:'User does not exist...'})
            return
        }
        // console.log('')
        // console.log(user_found._id)
        // console.log(req.user.userId)
        // console.log('')
        // console.log(user_found._id == req.user.userId)

        if(user_found._id == req.user.userId){
            console.log('Admin inviting himself...')
            res.status(400).json({message:'You cant invite yourself...'})
            return
        }

        console.log(' EZ')

        // //no need of this because using $addToSet  ... stay for res output purpose
        const invited_user_found = current_room.invited.includes(received_username)
        console.log(invited_user_found,' - user already is in invited array')

        await Room.findOneAndUpdate(
            {_id: current_room._id},
            {$addToSet: {invited: received_username}},
            {useFindAndModify: false}  //to delete use pull
            //push- can push when already such exists    addToSet - only push unique
        )

        console.log('User got added into invite array')
        
        //await current_room()


        //console.log(current_room,' - room with invited / appended user')

        //console.log(current_room,'room info where geting invited')

        // if(invited_user_found){
        //     //console.log(invited_user_found,' user already invited')
        //     res.status(400).json({message:'User already is invited...'})
        // }


        // if(invited_user_found){
        //     res.status(400).json({message:'User already invited...'})
        //     return
        // }



        res.status(201).json({message: 'User invited succesfuly!'})

    }catch (e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }

})

router.post('/kick_user/:id',authM,async (req, res) => {
    try{

        console.log('-----------------------------------------------------------')
        const {received_username} = req.body

        //console.log(received_username,' - received username') // ok 

        const user_found = await User.findOne({username:received_username})
        const current_room = await Room.findById(req.params.id)

        console.log(user_found,' - user found')

        console.log(' EZ')

        //if user does not exist  or   is admin of current room
        if(user_found==null){
            console.log('No such user found')
            res.status(400).json({message:'User does not exist...'})
            return
        }
        // console.log('')
        // console.log(user_found._id)
        // console.log(req.user.userId)
        // console.log('')
        // console.log(user_found._id == req.user.userId)

        if(user_found._id == req.user.userId){
            console.log('Admin is deleting himself...')
            res.status(400).json({message:'You cant kick yourself...'})
            return
        }

        console.log(' EZ')

        // //no need of this because using $addToSet  ... stay for res output purpose
        const invited_user_found = current_room.invited.includes(received_username)
        console.log(invited_user_found,' - user is in invited array')

        await Room.findOneAndUpdate(
            {_id: current_room._id},
            {$pull: {invited: received_username}},
            {useFindAndModify: false}  //to delete use pull
            //push- can push when already such exists    addToSet - only push unique
        )

        console.log('User got deleted from invite array')

        res.status(201).json({message: 'User kicked succesfuly!'})

    }catch (e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }

})

router.get('/get_invited/:id',authM,async (req, res) => {
    try{

        const current_room = await Room.findById(req.params.id)
        const invited_to_this_room = current_room.invited
        
        res.json(invited_to_this_room)

    }catch (e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }

})

router.post('/delete_my_room/',authM,async (req, res) => {
    try{

        console.log('-----------------------------------------------------------')

        const {received_room_id} = req.body


        await Room.findOneAndDelete({$and : [{_id: ObjectId(received_room_id)},{owner: req.user.userId}]}) 
        

        res.status(201).json({message: '......... '})//You have no room with such id...

    }catch (e){
        //console.log(e)
        console.log('catch delete')
        res.status(500).json({message: 'Wrong room id - check inputed room id'})
    }

})


router.post('/leave_room/',authM,async (req, res) => {
    try{

        console.log('-----------------------------------------------------------')

        const {received_room_id} = req.body
        //id received from front-end

        const curent_user = await User.findOne({_id:req.user.userId}) 
        //user that is currently logged in...to use his data for checks

        const all_rooms_where_invited = await Room.find({invited: curent_user.username})
        //array of all rooms where current-user is invited

        const bool_array = all_rooms_where_invited.map(e => String(e._id) === String(received_room_id)) //room_found._id
        //checking if any room in all_rooms_where_invited has same id as received 
        //this returns array of true and false statements 

        const bool_array_true = bool_array.includes(true)
        //checking if bool_array contains one true value
        //if it is true we can find coresponding room using received_room_id

        if(bool_array_true==true){ 
            await Room.findOneAndUpdate(

                {_id: ObjectId(received_room_id)},  
                //turns received string room id to ObjectId type
                {$pull: {invited: curent_user.username}},
                //deletes if invited has current 
                {useFindAndModify: false}  

            )
            
            console.log('cycle complete')

            res.status(201).json({message: 'Epic bruh moment --- dude left the room!'})

        }

        res.status(400).json({message: ' You have no such (invited room)...'})

    }catch (e){
        console.log(e)
        console.log('catch leave')
        res.status(500).json({message: 'Wrong room id - check inputed room id'})
    }

})




module.exports = router