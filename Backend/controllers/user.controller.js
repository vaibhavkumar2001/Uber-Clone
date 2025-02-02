const userModel = require("../models/user.model");
const userSchema = require("../models/user.model")
const userService = require("../services/user.service")
const { validationResult } = require('express-validator')

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) { // iska mtlb h ki errors array mein kuch error aarha h tb kya krna h 
        return res.status(400).json({errors: errors.array() })
    }

    console.log(req.body)

    // ab req ki body mien se necessary data nikal ke laana h 
    const { fullname,email,password } = req.body;
    
    // ab hm password ko directly toh bhej nhi skte db mein toh isliye hme usse hash krke bhejna padega
    const hashPassword = await userModel.hashPassword(password)

    // ab password bhi hash hogaya ab user ko db mein create krwado
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword, // ab password toh simple password tha toh hmne yahan hash krke daal diya h
    })

    // ab token generate krna h mujhe
    const token = await user.generateAuthToken();
    res.status(201).json({token, user})
} 