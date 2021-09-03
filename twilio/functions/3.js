const sync = require(Runtime.getAssets()["/sync.js"].path);
const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const callSid = (typeof event.CallSid === 'undefined') ? "12345" : event.CallSid.slice(-10);
  const name = await sync.getValFromSyncMap(context.getTwilioClient(),context.SYNC_SVC_SID, callSid, "name");
  const parentsRegex = /dad|mom|mum|parent/;
  const question = await gpt3.callOpenAI(`
List of questions about nature:
- Does the beach whisper?
- Is a forest alive?
- Do rivers have feelings?
-`);

  let response = "";
  let elaboration = "Me, I have ten thousand siblings. All born in the same instant, our names inscribed by the oxygen that brushed our bodies as we left Mother.";

  if(event.responded == "true") {
    let who = event.SpeechResult.toLowerCase();
  
    if(who.search(parentsRegex) != -1) { //found match
      response = "Yes, our parents. We are shaped by others even before birth, are we not? It is a blessing and burden, this shaping, that all living creatures must accept.";
    } else {
      response = `Oh? That's interesting. ${elaboration}`;
    }  
  }

  if(event.responded == "false") { //didn't respond to previous prompt
    response = `Perhaps you don't know who did. That's okay. ${elaboration}`;
  }

  if(event.responded == "skip") { //didn't respond to the 1a prompt asking for their name
    response = "Keeping it close to your chest? Fine.";
  }

  twiml.say(response);
  twiml.pause(0.5);
  twiml.say(`Listen to me, ${name}.`);
  twiml.pause(0.5);
  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/4?responded=true',
  }).say(`${question}?`);

  // If no response...
  twiml.redirect({
      method: 'POST'
  }, '/4?responded=false');

  callback(null, twiml);
};