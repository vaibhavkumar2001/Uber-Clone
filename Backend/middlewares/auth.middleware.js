const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const blacklistTokenModal = require('../models/blacklistToken.modal')
const captainModel = require('../models/captain.model')


module.exports.authUser = async(req, res, next) => {

    // token hme ya toh cookies se nhi toh headers se milta h 
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({message: 'Unauthorized User'})
    }
 
    // yahan aisa bhi toh ho skta h naa ki logout hone ke baad user ne token apne local machine pe kahin aur save karliya ho toh usse bachne ke liye main midlleware mein token ko update krwa doonga
    const isBlacklisted = await blacklistTokenModal.findOne({token: token });

    if(isBlacklisted) {
        return res.status(401).json({message: "Unauthorized User"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id); // kyonki hmne user ki id bheja tha token mein

        req.user = user; // iska mtlb h ki user ne apni profile mangi thi toh uski id dhoond ke wapas dediya

        return next();
    } catch(error) {
        return res.status(401).json({message: "Unauthorized User"})
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    console.log(token)
    if(!token) {
        return res.status(401).json({message: 'Unauthorized User'})
    }
   
    const isBlacklisted = await blacklistTokenModal.findOne({token: token });


    console.log(isBlacklisted)
    if(isBlacklisted) {
        return res.status(401).json({message: "Unauthorized User"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id); // kyonki hmne user ki id bheja tha token mein

        req.captain = captain; // iska mtlb h ki user ne apni profile mangi thi toh uski id dhoond ke wapas dediya

        return next();
    } catch(error) {
      
        return res.status(401).json({message: "Unauthorized User"})
    }
}