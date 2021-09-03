exports.handler = async(context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();

  if(typeof event.CallSid != 'undefined') { //callSID not defined when testing locally
    await context.getTwilioClient().calls(event.CallSid) 
    .recordings
    .create({
      recordingStatusCallback: `https://${context.DOMAIN_NAME}/recordEvents`
    })
    .then(recording => console.log(`created recording with sid ${recording.sid}`));
  }

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/2',
    actionOnEmptyResult: "true",
    }).say(`Silly question, I know. Of course you're a human. What other creature could dial this number? I believe we've met before, but I didn't get a chance to introduce myself. My name is Scoria. What's your name?`);
  
//can't really do much here if they don't respond?
  callback(null, twiml);
};
