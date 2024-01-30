const mongoose = require('mongoose');
const Topic = require('../models/topic');
const Chat = require('../models/chat');
const User = require('../models/users');
const {matchMakingReport} = require('../utils/astrology');

const createTopic = async (req, res, next) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const topic = new Topic({
      user: req.user.id,
      name: req.body.name
    });
    await topic.save({session});

    const {report} = await User.findById(req.user.id);
    const chat = new Chat({
      topic: topic.id,
      messages: [
        {
          role: 'system',
          content: `You are a Vedic astrologer who has access to a persons astrological details in the provided JSON format.
					'''
					${JSON.stringify(report, null, 2)}
					'''
					You have to answer astrology-related questions. and You will provide insights based on the information given in JSON data. 
					Keep in mind that responses should be derived from the provided data.  
					If question is not related to astrology or cannot be answered with the given information, 
					Do let me know. And It is important to make sure your answer should not have any legal or medical advice.`
        }
      ]
    });
    await chat.save({session});

    await session.commitTransaction();
    res.status(201).send({
      message: 'Topic created successfully',
      date: {
        chat
      }
    });
  } catch (error) {
    const err = {
      status: 400,
      message: 'Internal server error',
      error
    };
    next(err);
  }
};

const createMatchMakingTopic = async (req, res, next) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const topic = new Topic({
      user: req.user.id,
      name: req.body.name
    });
    await topic.save({session});

    const user = await User.findById(req.user.id);

    let data = {};

    if (user.gender === 'male') {
      data = {
        m_day: user.day,
        m_month: user.month,
        m_year: user.year,
        m_hour: user.hour,
        m_min: user.min,
        m_lat: user.lat,
        m_lon: user.lon,
        m_tzone: user.tzone,
        f_day: req.body.day,
        f_month: req.body.month,
        f_year: req.body.year,
        f_hour: req.body.hour,
        f_min: req.body.min,
        f_lat: req.body.lat,
        f_lon: req.body.lon,
        f_tzone: req.body.tzone
      };
    } else {
      data = {
        f_day: user.day,
        f_month: user.month,
        f_year: user.year,
        f_hour: user.hour,
        f_min: user.min,
        f_lat: user.lat,
        f_lon: user.lon,
        f_tzone: user.tzone,
        m_day: req.body.day,
        m_month: req.body.month,
        m_year: req.body.year,
        m_hour: req.body.hour,
        m_min: req.body.min,
        m_lat: req.body.lat,
        m_lon: req.body.lon,
        m_tzone: req.body.tzone
      };
    }

    const report = await matchMakingReport(data);
    const chat = new Chat({
      topic: topic.id,
      messages: [
        {
          role: 'system',
          content: `You are a Vedic astrologer who has access to a couples match making astrological details in the provided JSON format.
					'''
					${JSON.stringify(report, null, 2)}
					'''
					You have to answer astrology-related questions. and You will provide insights based on the information given in JSON data. 
					Keep in mind that responses should be derived from the provided data.  
					If question is not related to astrology or cannot be answered with the given information, 
					Do let me know. And It is important to make sure your answer should not have any legal or medical advice.`
        }
      ]
    });
    await chat.save({session});

    await session.commitTransaction();
    res.status(201).send({
      message: 'Topic created successfully',
      date: {
        chat
      }
    });
  } catch (error) {
    const err = {
      status: 400,
      message: 'Internal server error',
      error
    };
    next(err);
  }
};

const getTopics = async (req, res, next) => {
  try {
    const topics = await Topic.find({user: req.user.id}, {user: 0});
    res.send(topics);
  } catch (error) {
    const err = {
      status: 400,
      message: 'Internal server error',
      error
    };
    next(err);
  }
};

module.exports = {createTopic, createMatchMakingTopic, getTopics};
