const sync = require(Runtime.getAssets()["/sync.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const callSid = (typeof event.CallSid === 'undefined') ? "12345" : event.CallSid.slice(-10);
  const regex = /dad|mom|mum|parent/;
  const name = await sync.getValFromSyncMap(context.getTwilioClient(),context.SYNC_SVC_SID, callSid, "name")

console.log(`got name ${name}`)

  let who = (typeof event.SpeechResult === 'undefined') ? "bob dole" : event.SpeechResult;
  who = who.toLowerCase();
  let response;

  if(who.search(regex) != -1) { //found match
    response = "Yes, our parents. We are shaped by others even before birth, are we not? It is our blessing and burden, this shaping, that all living creatures must accept.";
  } else {
    response = "Sorry, I’m not sure what you said. Your parents, perhaps? Your sister? Your brother? Me, I have ten thousand siblings. All born in the same instant. And indeed, Mother branded us with names even as oxygen brushed our skin for the first time."
  }

  response += " Look, let’s be direct with each other. Think for a moment before you answer. Here’s what I want to know: what does it mean to be alive?"

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/3',
    actionOnEmptyResult: "true"
}).say(response);

  callback(null, twiml);
};




