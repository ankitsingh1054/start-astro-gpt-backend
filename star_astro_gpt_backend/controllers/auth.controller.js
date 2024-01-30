/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const astrology = require('../utils/astrology');

const userData = async (req, res, next) => {
  try {
    const result = await Promise.all([
      astrology.nakshatra(req.body),
      astrology.ascendant(req.body),
      astrology.numerology(req.body),
      astrology.gemSuggestion(req.body),
      astrology.manglik(req.body)
    ]);
    req.body.report = result;
    await User.updateOne({_id: req.user.id}, {...req.body});
    res.status(200).send({
      message: 'User updated Successfull'
    });
  } catch (error) {
    const err = {
      status: 500,
      message: 'Internal server error!',
      error
    };
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const exUser = await User.findOne({email: req.body.email}).select({_id: 1});
    if (exUser) {
      res.status(500).send({
        message: 'User exists'
      });
      return;
    }
    const salt = await bcrypt.genSalt(10);

    req.body.password = await bcrypt.hash(req.body.password, salt);
    req.body.from = 'normal';
    const user = await User(req.body);
    await user.save();

    const {password: _, ...data} = user.toObject();
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

    res.send({
      message: 'User Registered Successfull',
      data: {...data, token}
    });
  } catch (error) {
    const err = {
      status: 500,
      message: 'Internal server error!',
      error
    };
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email}).select({password: 1, from: 1});
    if (!user) {
      const err = {
        status: 400,
        message: 'User not found!',
        error: {
          message: 'User not found!'
        }
      };
      res.status(400).send(err);
      return;
    }
    if (user.from !== 'normal') {
      const err = {
        status: 400,
        message: `Please login via ${user.from}`
      };
      res.status(400).send(err);
      return;
    }
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
      const err = {
        status: 401,
        message: 'Invalid password!',
        error: {
          message: 'Invalid password!'
        }
      };
      res.status(401).send(err);
      return;
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

    res.send({
      message: 'User logged in successfully!',
      token
    });
  } catch (error) {
    const err = {
      status: 500,
      message: 'Internal server error!',
      error
    };
    res.status(500).send(err);
  }
};

const getUserData = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user.id}).select({password: 0});
    res.status(200).send(user);
  } catch (error) {
    const err = {
      status: 500,
      message: 'Internal server error!',
      error
    };
    res.status(500).send(err);
  }
};

module.exports = {register, userData, login, getUserData};
