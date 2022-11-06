const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        text: true
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        text: true
    },
    username: {
        type: String,
        required: [false, 'Username is required'],
        trim: true,
        text: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    picture: {
        type: String,
        default: ""
    },
    cover: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        trim: true,
    },
    bYear: {
        type: Number,
        required: true,
        trim: true
    },
    bMonth: {
        type: Number,
        required: true,
        trim: true
    },
    bDay: {
        type: Number,
        required: true,
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    friends: {
        type: Array,
        default: []
    },
    following:{
        type: Array,
        default: []
    },
    followers:{
        type: Array,
        default: []
    },
    requests:{
        type: Array,
        default: []
    },
    search: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    }],
    details:{
        bio:{
            type: String
        },
        otherName:{
            type: String
        },
        job:{
            type: String
        },
        workplace:{
            type: String
        },
        highSchool:{
            type: String
        },
        college:{
            type: String
        },
        currentCity:{
            type: String
        },
        homeTown:{
            type: String
        },
        relationship:{
            type: String,
            enum: ['Single', 'In a relationship', 'Married', 'Divorced']
        },
        instagram:{
            type: String
        },
        savePosts:{
            post: {
                type: mongoose.Schema.ObjectId,
                ref: 'Post'
            },
            saveAt: {
                type: Date,
                default: new Date()
            }
        }
    }
}, {
    timestamps:true
});

module.exports = mongoose.model('User', userSchema)