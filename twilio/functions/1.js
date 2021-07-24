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
      greeting = "Good morning"
  } else if (hour >= 12 && hour < 16) {
      greeting = "Good afternoon";
  } else if (hour >= 16 && hour < 23) {
      greeting = "Good evening";
  } else {
      greeting = "Fuck me its late";
  }

  //the url might need to change if we decide to use mulitple envs for testing -- this is fine for now
  twiml.play(`https://${context.DOMAIN_NAME}/BIGSPACEDRONE_8K_MONO_LIMITED.wav`)
  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/1a',
    actionOnEmptyResult: "true",
    }).say(`${greeting}, human. I’m so glad you called me. You are a human, aren’t you?`);
  
  callback(null, twiml);
};
