const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const creatures = await gpt3.callOpenAI(`
List of living things:
- Lizards and clouds
- Crows and wattle trees
- Creeks and caterpillars
-`);

  twiml.say(`Wonderful. There is so much life around us. ${creatures} are but the most obvious to the human eye.`);
  twiml.pause(0.5);
  twiml.say(`What about me? I have an igneous heart.`); 
  twiml.pause(0.5);
  twiml.say(`How alive do you think I am?`); 

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/9?responded=true',
  });

  // If no response...
  twiml.redirect({
    method: 'POST'
  }, '/9?responded=false');

  callback(null, twiml);
};