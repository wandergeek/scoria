const sync = require(Runtime.getAssets()["/sync.js"].path);
const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const callSid = (typeof event.CallSid === 'undefined') ? "12345" : event.CallSid.slice(-10);
  const question = await gpt3.callOpenAI(`
List of questions about nature:
- Does the beach whisper?
- Is a forest alive?
- Do rivers have feelings?
-`);
  
  let name = "";
  let response = "";
  let elaboration = "Me, I have ten thousand siblings, all born in the same instant. Our names were inscribed by the air that brushed our bodies as we were ejected from the earth.";

  if(event.responded == "true") {
    let who = event.SpeechResult.toLowerCase();
    name = await sync.getValFromSyncMap(context.getTwilioClient(),context.SYNC_SVC_SID, callSid, "name");
    if(who.search(/dad|mom|mum|parent/) != -1) { //found match
      response = "Yes, our parents. We are shaped by others even before birth, are we not? A blessing and a burden that all living creatures must accept.";
    } else {
      response = `Oh? That's interesting. ${elaboration}`;
    }  

  } else if(event.responded == "false") { //didn't respond to previous prompt
    name = await sync.getValFromSyncMap(context.getTwilioClient(),context.SYNC_SVC_SID, callSid, "name");
    response = `Perhaps you don't know who did. That's okay. ${elaboration}`;

  } else if(event.responded == "skip") { //didn't respond to the prompt asking for their name
    name = "Silent one";
    if (callSid != "12345") { //this is bad, move to an upsert instead
      await sync.addKVtoSyncMap(context.getTwilioClient(),context.SYNC_SVC_SID,callSid, "name", name)
     }
    response = "I didn't catch that, but not to worry.";
  }

  twiml.say(response);
  twiml.pause(0.5);
  twiml.say(`Listen to me, ${name}.`);
  twiml.pause(0.5);
  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/5?responded=true',
  }).say(`${question}?`);

  // If no response...
  twiml.redirect({
      method: 'POST'
  }, '/5?responded=false');

  callback(null, twiml);
};