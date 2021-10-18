const sync = require(Runtime.getAssets()["/sync.js"].path);
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
    greeting = `Good morning, human.`
  } else if (hour >= 12 && hour < 16) {
    greeting = `Good afternoon, human.`;
  } else if (hour >= 16 && hour < 23) {
    greeting = `Good evening, human.`;
  } else {
    greeting = `God, human, it's late. You should be resting. Still.`;
  }

  let platitude = utils.getRandomElement([
    "I'm pleased to hear from you.",
    "I'm delighted to hear from you.",
    "How wonderful of you to call.",
    "How nice of you to call.",
    "I'm flattered that you called.",
    "It's marvellous that we can talk."
  ]);

  twiml.play(`https://${context.DOMAIN_NAME}/intro.wav`)
  twiml.pause(0.5);
  twiml.say(`${greeting} ${platitude}`);
  twiml.pause(0.2);
  twiml.say(`You are a human, aren't you?`);

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