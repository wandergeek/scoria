const sync = require(Runtime.getAssets()["/sync.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const callSid = (typeof event.CallSid === 'undefined') ? "12345" : event.CallSid.slice(-10);
  const name = await sync.getValFromSyncMap(context.getTwilioClient(),context.SYNC_SVC_SID, callSid, "name")
  const userResponse = event.SpeechResult || "Yes, for sure.";
  
  let response = "";

  if(event.responded == "true") {
    switch (checkSentiment(userResponse)) {
      case "negative":
        response = "How awful of you to say.";
        break;
  
      case "neutral":
        response = "I hope you don't really mean that.";
        break;
  
      case "affirmative":
        response = "I see we're on the same page.";
        break;
    }
  } else { //didn't respond to previous prompt
    response = "I'm sorry you don't feel comfortable talking to me. You and I are more alike than you might think.";
  }

  twiml.say(response);
  twiml.pause(0.5);
  twiml.say(`Look, let's take a different approach, ${name}. There's an important thing I want to ask you. Think for a moment before you answer...`); 
  twiml.pause(0.5);
  twiml.say(`How alive do you think I am?`); 

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/6?responded=true',
  });

  // If no response...
  twiml.say("Don't be embarrassed. You can be truthful with me. I've been privy to every conversation you can imagine.")
  twiml.redirect({
    method: 'POST'
  }, '/6?responded=false');

  callback(null, twiml);
};

//returns string "affirmative", "negative", or "neutral" depending on sentiment of input. 
function checkSentiment(input) {
  const threshold = 0.5; //sentiment ranked scale +-5
  var Sentiment = require('sentiment');
  var sentiment = new Sentiment();
  var analysis = sentiment.analyze(input);

  if(analysis.comparative < -threshold) {
    ret = "negative";
  } else if(analysis.comparative >= -threshold && analysis.comparative < threshold) {
    ret = "neutral";
  } else if(analysis.comparative >= threshold ) {
    ret = "affirmative";
  }

  return ret;
}