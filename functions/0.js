const sync = require(Runtime.getAssets()["/sync.js"].path);

exports.handler = async(context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
    //slicing the call sid to the last 10 chars, otherwise the twilio api complains. probably for good reason? we should probably key to something else.
  const callSid = (typeof event.CallSid === 'undefined') ? "12345" : event.CallSid.slice(-10); 
  const client = context.getTwilioClient();

  if (callSid != "12345") { 
    //Create a sync map which will store all the persistent data for the call -- the map is keyed by a truncated callSID from the event
    await sync.createSyncMap(client, context.SYNC_SVC_SID, callSid); //this is not great to nest within the test sid branch
  }

  twiml.say("");

  twiml.redirect({
    method: 'POST'
    }, '/1');

  callback(null, twiml);
};