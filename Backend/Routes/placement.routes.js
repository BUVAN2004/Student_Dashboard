const express = require('express');;
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { placementUpdatesModel } = require('../Models/configuration.model');

router.get('/', asyncHandler(async (req, res) => {
    // const data = await placementUpdatesModel.find({endDate : {$gte : new Date()}});
    const data = await placementUpdatesModel.find();
    res.json({message : 'Placement Updates are retrieved', placementUpdates : data})
}));

module.exports = router;