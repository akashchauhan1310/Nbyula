const jwt =require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

const createUser = async(req,res) => {

    const {name,email,password,role} = req.body
    if(!name || !email || !password || !role)
    {
        res.status(400).send({status : 'Failed' , message : 'Fields cannot be empty'})
    }
    const newPassword = hashPassword(password)
    
    try {

        const newUser = await User.create({name,email,password : newPassword,role})
        const token = generateToken({name,email,role})
        res.status(201).json({status : 'Success' , token})
        
    } catch (error) {

        if(error.code===11000)
        res.status(400).json({status : 'Failed' , message : 'Email ID already exists'})
        else
        res.status(400).json({status : 'Failed' , message : 'Database Error'})
        
    }


}

const loginUser = async (req,res) => {

    const {email , password} = req.body

    if(!email || !password)
    return res.status(400).json({status : 'Failed', message : 'Fields cannot be empty'})

    try {

        const user = await User.findOne({email})
        if(!user)
        return res.status(400).json({status : 'Failed', message : 'Email not registered'})

        const dBPassword = user.password;
        if(!comparePassword(password,dBPassword))
        return res.status(400).json({status : 'Failed', message : 'Passwords do not match'})

        const currUser = {
            name : user.name,
            email : user.email,
            role : user.role
        }

        const token = generateToken(currUser);
        res.status(200).json({status : 'Success' , token})

        
    } catch (error) {

        console.log(error)
        res.status(400).json({status : 'Failed' , message : 'Database Error'})
        
    }
}

const generateToken = user => {

const token = jwt.sign(user,process.env.JWT_SECRET_KEY,{expiresIn : '30d'})
return token
}

const verifyToken = token => {

    try {
        const user = jwt.verify(token,process.env.JWT_SECRET_KEY)
        return user
        
    } catch (error) {

        console.log(error);
        return error
        
    }
}

const hashPassword = (password) => {

    const hashed = bcrypt.hashSync(password,10)
    return hashed
}

const comparePassword = (password,hashPassword) => {

    const result = bcrypt.compareSync(password,hashPassword)
    return result
}

module.exports = {createUser,loginUser}