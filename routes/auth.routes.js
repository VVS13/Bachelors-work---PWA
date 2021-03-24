const{Router} = require ('express')

const bcrypt = require('bcryptjs') //allows to hash password and to compare them

const {check, validationResult} = require('express-validator')

const User = require('../models/User')

const router = Router()

// /api/auth/register
router.post('/register',
[
    check('username','Not correct username').isAlphanumeric(),
    check('password','Minimal lenght of password is 3 symbols').isLength({min:3})
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

        const {username, password} = req.body
        //need to create validations so no faultry input is accepted

        const candidate = await User.findOne({username})

        if(candidate) {
            return res.status(400).json({message:'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password,12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message:'User created'})

    }catch(e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }
} )

// /api/auth/login
router.post('/register',async (req, res) =>{

} )

module.exports = router