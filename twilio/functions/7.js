const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const userResponse = event.SpeechResult || "The garden";
  const proverb = await gpt3.callOpenAI(`
Proverbs about the natural world:
- Home is where the dirt is softest.
- Outside is the place where the sun can see.
- ${userResponse}`);

  twiml.say(`Well, you know what they say: ${proverb}`);
  twiml.pause(0.5);
  twiml.say(`But I digress. There's something I want to ask you. A question close to my igneous heart.`); 
  twiml.pause(0.5);
  twiml.say(`How alive do you think I am?`); 

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/8?responded=true',
  });

  // If no response...
  twiml.redirect({
    method: 'POST'
  }, '/8?responded=false');

  callback(null, twiml);
};