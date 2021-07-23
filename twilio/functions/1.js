const sync = require(Runtime.getAssets()["/sync.js"].path);

exports.handler = async(context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  let moment = require('moment-timezone');
  let timezone = event.timezone || 'Australia/Melbourne';
  const hour = moment().tz(timezone).format('H');
  const callSid = (typeof event.CallSid === 'undefined') ? "12345" : event.CallSid.slice(-10); //if we don't receive a real event with a callsid, make one up

  //Create a sync map which will store all the persistent data for the call -- the map is keyed by the callSID from the event
  await sync.createSyncMap(context.getTwilioClient(), context.SYNC_SVC_SID, callSid);

  if (hour >= 5 && hour < 12) {
      greeting = "Good morning"
  } else if (hour >= 12 && hour < 16) {
      greeting = "Good afternoon";
  } else if (hour >= 16 && hour < 23) {
      greeting = "Good evening";
  } else {
      greeting = "Fuck me its late";
  }

  //the status url might need to change if we decide to use mulitple envs for testing -- this is fine for now
  twiml.play("https://scoria-6935-dev.twil.io/" + getRandomIntroSound())
  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/1a',
    actionOnEmptyResult: "true",
    }).say(`${greeting}, human. I’m so glad you called me. You are a human, aren’t you?`);
  
  callback(null, twiml);
};


function getRandomIntroSound() {
  let sound = ["BIGSPACEDRONE_8K_MONO_LIMITED.wav"]; //can add more here, but we like this one at the min.
  return sound[Math.floor(Math.random() * sound.length)];
}
