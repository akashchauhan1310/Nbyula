const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({

    name : {
        type : String,
        required:true
    },

    description : {
        type:String,
        required:true,
    },

    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Users'
    },

    quizId : {
        type : mongoose.Schema.Types.ObjectId,
        required:false,
        default:null,
        ref:'quizes'
    }

}, {timestamps : true})

module.exports = mongoose.model('Courses',courseSchema)