const Schema = require('mongoose').Schema;
const Usermodel = require('./User.model');

const FacultySchema = new Schema({
    hasAccess : Boolean,
    accessControl : [{
        startDate : Date,
        endDate : Date,
    }]
});

const FacultyModel = Usermodel.discriminator('Faculty' , FacultySchema);

module.exports = FacultyModel;