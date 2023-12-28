const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const resetPassword = async (req, res) => {
  if (res.app.locals.nextSession === false) {
    return res.status(404).send({ error: "session expired" });
  }

  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.json('This username does not seem to exist in the database');
    }

    if (!password) {
      return res.json('Password cannot be empty');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    if (hashedPass) {
      existingUser.password = hashedPass;
      await existingUser.save();
      req.app.locals.nextSession = false;
      return res.json('Password changed successfully');
    } else {
      return res.json('Could not hash the password');
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = resetPassword;
