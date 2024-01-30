const openai = require('openai');

const config = new openai.Configuration({apiKey: process.env.OPENAI_API_KEY});
const gpt = new openai.OpenAIApi(config);

module.exports = async rawMessages => {
  const messages = rawMessages.map(message => {
    return {role: message.role, content: message.content};
  });

  const completion = await gpt.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages
  });
  return completion.data.choices[0].message;
};
