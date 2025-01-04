const Schema = require('mongoose').Schema;
const Usermodel = require('./User.model');

const StudentSchema = new Schema({
    currentPlacementFa : Number,
    cummulativeFa : Number,
    attendance : Number,
    placementType : String,
    yearOfStudy : String,
    semester : String,
    placementAttendance : Number,
    batch : String,
    placementRank : Number,
    deptRank : Number,
    score : Number,
    companiesRegistered : [{
        companyName : String,
        companyRegisteredDate : Date,
        companyAttendedDate: Date,
        roundsCleared : Number,
        status : String,
    }],
    psSkill : [{
        language : String ,
        completedStatus : [{
            level : Number,
            attempts : Number,
            clearedDate : Date,
        }]
    }],
    psScore : {type : Number , default : 0}
})

const StudentModel = Usermodel.discriminator('Student' , StudentSchema);
module.exports = StudentModel;