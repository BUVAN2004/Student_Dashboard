const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const StudentModel = require('../Models/Student.model');

router.get('/', asyncHandler(async (req, res) => {
    const StudentData = await StudentModel.find({userType : 'Student'},{id: 1, name : 1, department : 1, Designation : 1,
        score : 1, placementRank : 1, deptRank : 1});
        // console.log(StudentData);
    res.json({message : 'User data are already stored in in Session storage during Login process & Students Data are retrieved', StudentData: StudentData})
}));

module.exports = router;