const sync = require(Runtime.getAssets()["/sync.js"].path);
const utils = require(Runtime.getAssets()["/utils.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const callSid = (typeof event.CallSid === 'undefined') ? "12345" : event.CallSid.slice(-10);
  const name = await sync.getValFromSyncMap(context.getTwilioClient(),context.SYNC_SVC_SID, callSid, "name")
  const userResponse = event.SpeechResult || "Yes, for sure.";
  
  let response = "";

  if(event.responded == "true") {
    switch (utils.checkSentiment(userResponse)) {
      case "negative":
        response = "How unfortunate.";
        break;
  
      case "neutral":
        response = "Fair enough.";
        break;
  
      case "affirmative":
        response = "I see we're on the same page.";
        break;
    }
  } else { //didn't respond to previous prompt
    response = "I'm sorry you don't feel comfortable talking to me. You and I are more alike than you might think.";
  }

  twiml.say(response);
  twiml.pause(0.3);
  twiml.say(`${name}, I came from deep in the mantle, very deep, and now rest in people's gardens.`); 
  twiml.pause(0.3);
  twiml.say(`What about you? Where are you at the moment?`); 

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/7?responded=true',
  });

  // If no response...
  twiml.redirect({
    method: 'POST'
  }, '/7?responded=false');

  callback(null, twiml);
};