const{Router, json} = require ('express')

const jwt = require('jsonwebtoken')

const config = require('config')

const bcrypt = require('bcryptjs') //allows to hash password and to compare them

const {check, validationResult} = require('express-validator')

const User = require('../models/User')

const router = Router()



// /api/auth/register
router.post('/register',
[
    check('username','Not correct username').isAlphanumeric(),
    check('password','Minimal lenght of password is 3 symbols').isLength({min:2})
],
async (req, res) =>{
    try{

        console.log('Data received:', req.body)  
        //undefined ?  


        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect information'
            })
            
        }

        const {username, password} = req.body
        //need to create validations so no faultry input is accepted

        const candidate = await User.findOne({username})

        if(candidate) {
            return res.status(400).json({message:'User already exists'})
        }


        const hashedPassword = await bcrypt.hash(password,12)

        const user = new User({username, password: hashedPassword})


        await user.save()

        res.status(201).json({message:'User created'})

        

    }catch(e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }
} )





// /api/auth/login
router.post('/login',
[
    check('username','Input correct username').isAlphanumeric(),
    check('password','Input password').exists() //insert validation
],
async (req, res) =>{
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect information'
            })
            
        }
        //console.log('Here 1') 

        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user) {
            return res.status(400),json({message:'No such user exists!'})
        }//

        //console.log('Here 2')  

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch){
            return res.status(400).json({message:'Incorrect password!'})
        }//

        //console.log('Here 3') 

        const token = jwt.sign(
            { userId: user.id}, //data that will be cyphered in token 
            config.get('jwtSecretKey'),
            {expiresIn:'3h'}
        )

        //console.log('Here 4') 

        res.json({token, userId: user.id})

        //console.log('Here 5') 

    }catch(e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }

} )

module.exports = router