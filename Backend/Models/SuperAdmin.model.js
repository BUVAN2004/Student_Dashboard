const Schema = require('mongoose').Schema;
const Usermodel = require('./User.model');

const SuperAdminModel = Usermodel.discriminator('SuperAdmin' , new Schema({}));

module.exports = SuperAdminModel;