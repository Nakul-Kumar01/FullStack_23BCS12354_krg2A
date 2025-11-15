
const express = require('express');
const {register,login,logout,deleteProfile,userProfile,leaderboard} = require('../controler/userAuthent');
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const {adminRegister} = require('../controler/adminAuthent')


const authRouter = express.Router();


authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout', userMiddleware,logout);
authRouter.post('/admin/register', adminMiddleware, adminRegister); // admin can register another admin
// authRouter.get('/getProfile',getProfile);

authRouter.delete('/deleteProfile',userMiddleware,deleteProfile);
authRouter.get('/MyProfile',userMiddleware,userProfile);
authRouter.get('/Leaderboard',userMiddleware,leaderboard);
authRouter.get('/check',userMiddleware,(req,res)=>{

    const reply = {
        firstName: req.result.firstName,
        emailId: req.result.emailId,
        _id: req.result._id,
        role: req.result.role,
        createdAt: req.result.createdAt
    }

    res.status(200).json({
        user: reply,
        message: "valid user"
    })
})



module.exports = authRouter; // ye export hota hai