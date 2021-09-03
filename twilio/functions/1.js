const sync = require(Runtime.getAssets()["/sync.js"].path);

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
      greeting = "Good morning, human. I'm pleased to hear from you."
  } else if (hour >= 12 && hour < 16) {
      greeting = "Good afternoon, human. I'm so glad you called me.";
  } else if (hour >= 16 && hour < 23) {
      greeting = "Hello, human. How lovely to hear from you on this fine evening.";
  } else {
      greeting = "By god, human, it's late. You should be resting. Still, I'm glad you called.";
  }

  twiml.play(`https://${context.DOMAIN_NAME}/intro.wav`)
  twiml.say(`${greeting} You are a human, aren't you?`);
  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/1a?responded=true',
    });
  
    twiml.say(`That's ok, you don't have to answer. Apologies if I've offended you. My sensibilities have shifted tectonically over the millenia.`);
    twiml.pause(0.5);
    twiml.redirect({
      method: 'POST'
  }, '/1a?responded=false');
  

  callback(null, twiml);
};
