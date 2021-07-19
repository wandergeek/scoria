const axios = require('axios');

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const gpt3Response = twiml.say(await gpt3Handler(event));
  callback(null, twiml);
};

const gpt3Handler = async (event) => {
  const actions = [];

  const instance = axios.create({
    baseURL: 'https://api.openai.com/v1/',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  });

  const dialog = [
    'The following is a conversation with an AI assistant. The assistant is clever, funny, and rude.',
    'AI: Look, let me be straight with you. I have an important question to ask. Think for a moment before you answer. Tell me, are you alive?',
    'Human: Yeah, I think so.',
    'AI: Yes, of course you think you are.',
    'Human: No I don\'t think so',
    'AI: Don’t be silly, of course you’re alive. Take this seriously.',
    'Human: I\'m not sure.',
    'AI: Yes yes, you’re alive, you’re alive.',
  ];

  dialog.push(`human: ${event.CurrentInput}`);
  dialog.push('AI:');

  const completionParmas = {
    prompt: dialog.join('\n'),
    max_tokens: 75,
    temperature: 0.50,
    n: 1,
    stream: false,
    logprobs: null,
    echo: false,
    stop: '\n',
  };

  let botResponse;
  try {
    const result = await instance.post('/engines/davinci/completions', completionParmas);
    botResponse = result.data.choices[0].text.trim();
    
  } catch (err) {
    botResponse = "Sorry I died. Can you call back later?"
    console.log(err);
  }

  return botResponse;
};