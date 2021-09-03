const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);
const sync = require(Runtime.getAssets()["/sync.js"].path);
const utils = require(Runtime.getAssets()["/utils.js"].path);

exports.handler = async(context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const name = event.SpeechResult || "Gary";
  const callSid = (typeof event.CallSid === 'undefined') ? "12345" : event.CallSid.slice(-10);

  const namePhrase = await gpt3.callOpenAI(`
List of things that sound like a name:
- a tiger's roar
- a violin being tuned
- the drone of cicadas
-`)

  if (callSid != "12345") { //this is bad, move to an upsert instead
   await sync.addKVtoSyncMap(context.getTwilioClient(),context.SYNC_SVC_SID,callSid, "name", name)
  }

  let nameDescriptor = utils.getRandomElement([
    "an angelic",
    "an awesome",
    "a beautiful",
    "a charming",
    "a dashing",
    "a dazzling",
    "a delightful",
    "an electrifying",
    "an elegant",
    "an enchanting",
    "a fantastic", 
    "a gentle",
    "a harsh",
    "a magical",
    "a mighty",
    "a sonorous", 
    "a strange",
    "a stunning",
    "a sweet",
    "a terrific",
    "a wonderful",
    "a wondrous"
  ]);

  twiml.say(`${name}, huh? What ${nameDescriptor} name. It reminds me of ${namePhrase}.`)
  twiml.pause(0.5);
  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/3?responded=true'
  }).say(`May I ask, who gave you that name?`);

  // If no response...
  twiml.redirect({
    method: 'POST'
  }, '/3?responded=false');

  callback(null, twiml);
};