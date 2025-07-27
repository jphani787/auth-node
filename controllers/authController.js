const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try{
        const { username, email, password, role} = req.body;
        const isUserExist = await User.findOne({$or: [{username},{email}]});
        if(isUserExist) {
            return res.status(400).json({
                success: false,
                message: "Username or email alredy exist!"
            }); 
        }
        const salt = await bcrypt.genSalt(10);
        const hasPassword = await bcrypt.hash(password, salt);
        const createNewUser = new User({
            username,
            email,
            password: hasPassword,
            role: role || 'user'
        });
        await createNewUser.save();
        if(createNewUser) {
            res.status(200).json({
                success: true,
                message: 'User created successfully',
                data: createNewUser
            })
        }else {
            res.status(400).json({
                success: false,
                message: 'Unable to register user please try again'
            });
        }

    }catch(err) {
        res.status(500).json({
            success: false,
            message: 'Some error occured! please try again!',
            error: err
        });
    }
}

const loginUser = async(req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user credentials!'
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password!'
            })
        }
        const accessToken = jwt.sign({
            userId : user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '15m'
        });

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            accessToken
        });
    }catch(err) {
        res.status(500).json({
            success: false,
            message: 'Some error occured! please try again!',
            error: err
        });
    }
}

const changePassword = async (req, res) => {
    try {
        const userId = req.userInfo.userId;
        const {oldPassword, newPassword} = req.body;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }
        
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        
        if(!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Old password is not correct! please try again!'
            });
        }
        
        const salt = await bcrypt.genSalt(10);
        const newHasedPassword = await bcrypt.hash(newPassword, salt);
        user.password = newHasedPassword;
        await user.save();  
        res.status(200).json({
            success: true,
            message: 'Password is changed successfully'
        });
    }catch(err) {
        res.status(500).json({
            success: false,
            message: 'Some error occured! please try again!',
            error: err
        });
    }
}

module.exports = {
    registerUser, 
    loginUser, 
    changePassword
}