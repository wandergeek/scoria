const sync = require(Runtime.getAssets()["/sync.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const callSid = (typeof event.CallSid === 'undefined') ? "12345" : event.CallSid.slice(-10);
  const name = await sync.getValFromSyncMap(context.getTwilioClient(),context.SYNC_SVC_SID, callSid, "name")
  const userResponse = (typeof event.SpeechResult === 'undefined') ? "Yes, for sure." : event.SpeechResult;
  
  let response;

  switch (checkSentiment(userResponse)) {
    case "negative":
      response = "How awful of you to say."
      break;

    case "neutral":
      response = "I hope you don’t really mean that."
      break;

    case "negative":
      response = "How awful of you to say."
      break;
  }

  response += ` Look, let’s take a different approach, ${name}. There’s an important thing I want to ask you. Think for a moment before you answer. Am I alive to you?`

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/6',
    actionOnEmptyResult: "true"
}).say(response);

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