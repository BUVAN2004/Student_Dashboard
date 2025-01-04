const express = require('express');;
const router = express.Router();
const asyncHandler = require('express-async-handler');
const StudentModel = require('../Models/Student.model');

router.get('/:id', asyncHandler(async (req, res) => {
    const StudentData = await StudentModel.findOne({id : req.params.id});
    // console.log(StudentData);
    res.json({message : 'Student Data are retrieved', StudentData: StudentData})
}));

module.exports = router;