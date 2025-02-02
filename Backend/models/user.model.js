const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be 3 characters long"],
            maxlength: [20, "First name must be 20 characters long"],
        },
        lastname: {
            type: String,
            minlength : [3, "Last name must be 3 characters long"],
            maxlength: [20, "Last name must be 20 characters long"],
        }
    },
    email : {
        type: String,
        required : true,
        unique: true,
        match : [/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        select: false, // yeh isliye use kr rhe h kyoki jb bhi koi user request hoga tb password nhi jaayega
        minlength: [8, "Password must be 8 characters long"],
        maxlength: [20, "Password must be 20 characters long"],
    },
    socketId: { // yeh islieye use kr rhe h kyonki yeh driver ki live location batane mein help karega
        type : String,
    }
})

/// ab mujhe user ke schema pe kuch Auth Methods lagana padega
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({_id: this._id }, process.env.JWT_SECRET)
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel