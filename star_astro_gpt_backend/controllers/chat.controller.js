/* eslint-disable consistent-return */
const Chat = require('../models/chat');
const askGpt = require('../utils/ask_gpt');

const askQuestion = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id).populate('topic');
    if (chat.topic.user.toString() !== req.user.id) {
      const err = {
        status: 401,
        message: 'Unauthorized',
        error: {
          message: 'You are not allowed to ask questions in this chat'
        }
      };
      return next(err);
    }

    chat.messages.push({role: req.body.role, content: req.body.content});

    const result = await askGpt(chat.messages);
    chat.messages.push(result);

    await chat.save();
    res.send({
      message: 'Question asked successfully',
      data: {
        response: result
      }
    });
  } catch (error) {
    const err = {
      status: 500,
      message: 'Internal Server Error',
      error
    };
    next(err);
  }
};

const getChat = async (req, res, next) => {
  try {
    const chat = await Chat.findOne({topic: req.params.topic_id}).populate('topic');
    if (chat.topic.user.toString() !== req.user.id) {
      const err = {
        status: 401,
        message: 'Unauthorized',
        error: {
          message: 'You are not allowed to ask questions in this chat'
        }
      };
      return next(err);
    }

    res.send({
      message: 'Chat fetched successfully',
      data: {
        chat
      }
    });
  } catch (error) {
    const err = {
      status: 500,
      message: 'Internal Server Error',
      error
    };
    next(err);
  }
};

module.exports = {askQuestion, getChat};
