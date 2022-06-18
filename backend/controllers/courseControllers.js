const Course = require('../models/courseModel')
const createCourse = async(req,res) => {

    const {id,name,role} = req.body.user
    const {name : courseName,description} = req.body

    if(!courseName || !description)
    {
        return res.status(400).json({status : 'Failed', message : 'Fields cannot be empty'})
    }

    if(role!=='teacher')
    {
        return res.status(400).json({status : 'Failed', message: 'Not a teacher'})
    }

    try {

        const newCourse = await Course.create({name : courseName,description,createdBy : id})
        if(newCourse)
        return res.status(201).json({status : 'Success',course : newCourse})
        
    } catch (error) {

        console.log(error)
        return res.json({status : 'Failed', message : 'Database error'})
        
    }



}

const getAllCourses = async (req,res) => {

    try {

        const courses = await Course.find().populate('createdBy','_id name')
        if(courses)
        res.status(200).json({status : 'Success' , data : courses})
        
    } catch (error) {
        console.log(error)
        res.json({status : 'Failed', message : 'Database error'})
        
    }
}

const getSingleCourse = async (req,res) => {

    const id = req.params.id
    if(!id)
    return res.status(400).json({status : 'Failed', message : 'Id cannot be empty'})

    try {
        const course = await Course.findById(id).populate('createdBy','_id name')
        if(course)
        return res.status(200).json({status : 'Success', data : course})
    } catch (error) {

        console.log(error)
        res.json({status : 'Failed', message : 'Database error'})
        
    }
}

const updateCourse = async (req,res) => {
    const id = req.params.id
    const {role} = req.body.user
    const {name,description} = req.body
    if(role!=='teacher')
    {
        return res.status(400).json({status : 'Failed', message: 'Not a teacher'})
    }

    if(!id)
    return res.status(400).json({status : 'Failed', message : 'Id cannot be empty'})

    if(!name || !description)
    return res.status(400).json({status : 'Failed', message : 'Name and description fields cannot be empty'})


    try{
        const filter = {_id : id}
        const update = {name,description}

        const updated = await Course.findOneAndUpdate(filter,update,{new : true}).populate('createdBy','_id name')
        if(updated)
        return res.status(200).json({status : 'Success' , data : updated})
    }
    catch(error){
        console.log(error)
        res.json({status : 'Failed', message : 'Database error'})

    }

}

const deleteCourse = async (req,res) => {

    const id = req.params.id
    if(!id)
    return res.status(400).json({status : 'Failed', message : 'Id cannot be empty'})

    try {
        const course = await Course.findById(id)
        if(!course)
        return res.status(400).json({status : 'Failed', message : 'No course with given id found'})
        await course.remove()
        return res.status(200).json({status : 'Success', message : 'deleted'})
    } catch (error) {

        console.log(error)
        res.json({status : 'Failed', message : 'Database error'})
        
    }
}
module.exports = { createCourse, getAllCourses, getSingleCourse,updateCourse,deleteCourse}