const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,'Please fill in your name'] 
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists!'],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email'],
    },
    password: {
        type: String,
        required: [true,"please add a password"],
        minlength: [8, 'password must be atleast 8 characters']
    },
    Admin:{
        type:Boolean,
        default:false
    },
    likedMovies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Movie'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);