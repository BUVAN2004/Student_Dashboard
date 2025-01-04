const mongoose = require('mongoose');

 function connectDB() {
    mongoose.connect(process.env.MONGO_URL)
    .then((e)=>console.log(`Connected to MongoDB ${e.connection.host} : ${e.connection.port}`))
    .catch((e)=>console.log(`Error connecting to MongoDB : `, e));
        
}

module.exports = connectDB;