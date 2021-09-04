const sync = require(Runtime.getAssets()["/sync.js"].path);
const utils = require(Runtime.getAssets()["/utils.js"].path);

exports.handler = async(context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  let moment = require('moment-timezone');
  let timezone = event.timezone || 'Australia/Melbourne';
  const hour = moment().tz(timezone).format('H');
    //slicing the call sid to the last 10 chars, otherwise the twilio api complains. probably for good reason? we should probably key to something else.
  const callSid = (typeof event.CallSid === 'undefined') ? "12345" : event.CallSid.slice(-10); 
  const client = context.getTwilioClient();

  if (callSid != "12345") { 
    //Create a sync map which will store all the persistent data for the call -- the map is keyed by a truncated callSID from the event
    await sync.createSyncMap(client, context.SYNC_SVC_SID, callSid); //this is not great to nest within the test sid branch
  }

  if (hour >= 5 && hour < 12) {
    greeting = `Good morning, human.`
  } else if (hour >= 12 && hour < 16) {
    greeting = `Good afternoon, human.`;
  } else if (hour >= 16 && hour < 23) {
    greeting = `Good evening, human.`;
  } else {
    greeting = `By god, human, it's late. You should be resting. Still.`;
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
  twiml.pause(0.3);
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