const Schema = require('mongoose').Schema;
const model = require('mongoose').model;
const configuration = new Schema({} , {discriminatorKey : 'configurationType'});

const MarksSchema = new Schema({
    title: { type: String, required: true },
    stages: [{
        stageName: { type: String, required: true },
        description : { type: String, required: true },
        parameters: [{
            parameterName: { type: String, required: true },
            maxMark: { type: Number, required: true },
        }]
    }]
}, { timestamps: true });

const placementUpdates = new Schema({
    title : String,
    description : String,
    link : String,
    startDate : Date,
    endDate : Date,
},{timestamps : true});

const StudentMarksSchema = new Schema({
    id : String,
    stages: [{
        stageName : String,
        marks : [Number]
    }]
})

const MarksModel = model('Marks' , MarksSchema);
const placementUpdatesModel = model('placementUpdates' , placementUpdates);
const StudentMarksModel = model('StudentMarks' , StudentMarksSchema);

module.exports = {MarksModel , placementUpdatesModel, StudentMarksModel};