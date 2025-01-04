const UserModel = require('./Models/User.model');

async function auth(req, res) {
    const body = req.body;
    const user = await UserModel.findOne({email : body.email}).lean();
    // console.log(user);
    if(user){
        if(user.password === body.password){
            const {password, ...userData} = user;
            console.log('Login')
            res.status(200).json({message : 'Login successful' ,  user : userData});
        }
        else{
            console.log('invalid')
            res.status(401).json({message : 'Invalid password'});
        }
    }
    else{
        console.log('not found')
        res.status(404).json({message : 'User not found'});
    }
}
module.exports = auth;