const sync = require(Runtime.getAssets()["/sync.js"].path);
const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const callSid = (typeof event.CallSid === 'undefined') ? "12345" : event.CallSid.slice(-10);
  const name = await sync.getValFromSyncMap(context.getTwilioClient(),context.SYNC_SVC_SID, callSid, "name")
  const regex = /dad|mom|mum|parent/;
  const question = await gpt3.callOpenAI(`
  List of questions about nature:
  - Does the beach whisper?
  - Is a forest alive?
  - Do rivers have feelings?
  -`)

  console.log(`got name ${name}`)

  let who = (typeof event.SpeechResult === 'undefined') ? "bob dole" : event.SpeechResult;
  who = who.toLowerCase();
  let response;

  if(who.search(regex) != -1) { //found match
    response = "Yes, our parents. We are shaped by others even before birth, are we not? It is our blessing and burden, this shaping, that all living creatures must accept.";
  } else {
    response = "Sorry, I’m not sure what you said. Your parents, perhaps? Your sister? Your brother? Me, I have ten thousand siblings. All born in the same instant. And indeed, Mother branded us with names even as oxygen brushed our skin for the first time."
  }

  response += ` Listen to me, ${name}. ${question}?`

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/4',
    actionOnEmptyResult: "true"
}).say(response);

  callback(null, twiml);
};




