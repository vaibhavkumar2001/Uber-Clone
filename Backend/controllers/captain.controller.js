const captainModel = require('../models/captain.model')
const { validationResult } = require('express-validator')
const  captainService  = require('../services/captain.service')
const blacklistTokenModal = require('../models/blacklistToken.modal')



module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email,password, vehicle } = req.body;

    const isCaptainAlreadyExists = await captainModel.findOne({ email })

    if(isCaptainAlreadyExists) {
        return res.status(400).json({message: "Captain Already Exists"})
    }

    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    })

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });

}

//Captain ko login krwana h 
module.exports.loginCaptain = async (req,res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email,password } = req.body;

    // ab iss email aur password ki help se main iska user dhoondoonga 
    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain) {
        return res.status(401).json({message: "Invalid email or password"});
    }
  
    const isMatch = await captain.comparePassword(password);
    if(!isMatch) {
        return res.status(401).json({message: "Invalid email or password"});
    }

    const token = captain.generateAuthToken();

    // ab token ko cookie mein set krna h 
    res.cookie('token', token)

    res.status(200).json({token,captain});
}

// Get Captain Profile ka code likhna h mujhe

module.exports.getCaptainProfile = async(req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next ) => {

    // token ko find karo
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    // token ko blacklist karo
    await blacklistTokenModal.create({token})

    // cookie ko clear krdo
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}