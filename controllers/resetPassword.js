const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const resetPassword = async (req, res) => {
  try {
    const {_id} = req.user;
    const {password } = req.body;

    const existingUser = await User.findOne({ _id });

    if (!existingUser) {
      return res.json('This user does not seem to exist in the database');
    }

    if (!password) {
      return res.json('Password cannot be empty');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    if (hashedPass && existingUser.OTPverfied) {
      existingUser.password = hashedPass;
      existingUser.OTPverfied = false;
      await existingUser.save();
      return res.json('Password changed successfully');
    } else {
      return res.json('Could not hash the password');
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = resetPassword;
