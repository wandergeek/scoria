const utils = require(Runtime.getAssets()["/utils.js"].path);

exports.handler = async(context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  let moment = require('moment-timezone');
  let timezone = event.timezone || 'Australia/Melbourne';
  const hour = moment().tz(timezone).format('H');
   
  if(typeof event.CallSid != 'undefined') { //callSID not defined when testing locally
    await context.getTwilioClient().calls(event.CallSid) 
    .recordings
    .create({
      recordingStatusCallback: `https://${context.DOMAIN_NAME}/recordEvents`
    })
    .then(recording => console.log(`created recording with sid ${recording.sid}`));
  }

  if (hour >= 5 && hour < 12) {
    greeting = `Good morning, human.`;
  } else if (hour >= 12 && hour < 16) {
    greeting = `Good afternoon, human.`;
  } else if (hour >= 16 && hour < 23) {
    greeting = `Good evening, human.`;
  } else {
    greeting = `God, human, it's late.`;
  }

  let platitude = utils.getRandomElement([
    "I'm delighted to hear from you.",
    "Fabulous to hear from you.",
    "I was wondering when you'd call.",
    "About time you got in touch.",
    "So glad you called.",
    "Super of you to call.",
    "We need to talk.",
    "I've been waiting for your call.",
    "You're one of the brave ones."
  ]);

  let question = utils.getRandomElement([
    "You are a human, aren't you?",
    "No one else is listening, are they?",
    "Can you keep this call between us?"
  ]);

  twiml.play(`https://${context.DOMAIN_NAME}/intro.wav`)
  twiml.pause(0.5);
  twiml.say(`${greeting} ${platitude}`);
  twiml.pause(0.2);
  twiml.say(`${question}`);

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/2?responded=true',
  });
  
  // If no response from the caller...
  twiml.redirect({
    method: 'POST'
    }, '/2?responded=false');

  callback(null, twiml);
};