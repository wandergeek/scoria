exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/2',
    actionOnEmptyResult: "true",
    }).say(`Silly to ask, I know. Of course you’re a human. What other creature could dial this number? I believe we’ve met before, but I didn't get a chance to introduce myself. My name is Scoria. What’s your name?`);
  
  callback(null, twiml);
};
