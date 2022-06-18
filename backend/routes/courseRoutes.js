const express = require('express')
const router = express.Router()
const {authenticate} = require('../middleware/authMiddleware')
const { createCourse , getAllCourses, getSingleCourse,updateCourse,deleteCourse} = require('../controllers/courseControllers')

router.use(authenticate)
router.route('/').post(createCourse).get(getAllCourses)

router.route('/:id').get(getSingleCourse).put(updateCourse).delete(deleteCourse)


module.exports = router