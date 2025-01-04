const express = require('express');
const router = express.Router();
const UserModel = require('../Models/User.model');
const asyncHandler = require('express-async-handler');
const FacultyModel = require('../Models/Faculty.model');
const { MarksModel, StudentMarksModel } = require('../Models/configuration.model');

router.get('/', asyncHandler(async (req, res) => {
    const facultyData = await FacultyModel.find({userType : 'Faculty'},{_id : 0 , password : 0 , accessControl : 0})
    res.json({message : 'User data are already stored in Session storage during Login process & Faculties Data are retrieved', facultyData: facultyData})
}));
router.put('/updateFacultyAccess', asyncHandler(async (req, res) => {
    const facultyData = req.body;
    const accessupdate = await FacultyModel.findOneAndUpdate({userType : 'Faculty' , id : facultyData.id},
         {hasAccess : facultyData.hasAccess}, {new : true});
    // console.log(facultyData)
    console.log(accessupdate)
    res.json({message : `Access ${facultyData.hasAccess ? 'Granted' : 'Revoked'} to Faculty ${accessupdate.name}(${accessupdate.id}) successfully`});
}));

router.get('/marks', asyncHandler(async(req, res) => {
    const data = await MarksModel.findOne();
    res.json({message : "Marks Data are retrieved", fullstackmarks : data})
}))

router.put('/marksupdate', asyncHandler(async(req, res) => {
    const del_data = await MarksModel.findOneAndDelete({title : req.body.title});
    const data = await MarksModel.insertMany(req.body);
    res.json({message : "Marks Data are updated", fullstackmarks : data})
}))

router.post('/updateMark/:id', asyncHandler(async(req, res) => {
    // console.log(req.body);
    const {stageName, marks} = req.body;
    const data = await StudentMarksModel.findOne({id : req.params.id});
    if(!data){
        const newdata = await StudentMarksModel.create({id : req.params.id , stages : [{stageName , marks : marks}]});
        res.json({message : `Marks Data are updated for ${req.params.id}`, fullstackmarks : newdata})
        return;
    }
    const stages = data.stages.length;
    for(let i=0; i<stages; i++){
        if(data.stages[i].stageName === stageName){
            res.json({Message : `Marks already Found for that Student(${stageName})`});
            return;
        }
    }
    res.json({message : "Marks Data are updated for ${data.id}", fullstackmarks : data})
}))

module.exports = router;