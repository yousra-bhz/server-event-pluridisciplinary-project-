const validator = require('validator');
const User = require('../models/user.js');
const Admin = require('../models/admin')
const bcrypt = require('bcrypt');

//WORKING

const register = async (req, res) => {
    const { username, email, password, preOne, preTwo, preThree } = req.body;
    

    try {
        // Check the existence of the user
        if (!email || !username || !password) {
            return res.json({
                status: "FAILED",
                message: "One or more fields are missing"
            });
        } else if (!validator.isEmail(email)) {
            return res.json({
                status: "FAILED",
                message: "The email does not have the appropriate format"
            });
        } else if (!validator.isStrongPassword(password)) {
            return res.json({
                status: "FAILED",
                message: "The password is not strong"
            });
        }

        // Check if the user exists
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.json({
                status: "FAILED",
                message: "The email already exists"
            });
        }

        // Hash the password
        const hashedPass = await bcrypt.hash(password, 10);

        if (!hashedPass) {
            return res.json('Error while trying to hash the password');
        }

        // Create and save the new user
        const newUser = new User({
            email,
            username,
            password: hashedPass,
            preOne,
            preTwo,
            preThree
        });

        await newUser.save().then(() => {
            const emailAdmin = "admin@gmail.com"
            res.json({
                status: "Success",
                message: "User saved successfully"
            });

            Admin.findOne({email : emailAdmin}).then((admin) => {
                            admin.usersRegistered ++
                            admin.save()
            })
        });

        
    } catch (error) {
        console.error('An error occurred when trying to save the user:', error);

        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            const fieldName = Object.keys(error.keyPattern)[0];
            const duplicateValue = error.keyValue[fieldName];
            return res.status(400).json({ message: `Duplicate key error: ${fieldName} '${duplicateValue}' already exists.` });
        } else {
            // Handle other errors
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = register;
