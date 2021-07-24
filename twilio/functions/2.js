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
        "angelic",
        "awesome",
        "beautiful",
        "charming",
        "dashing",
        "dazzling",
        "delightful",
        "electrifying",
        "elegant",
        "enchanting",
        "fantastic", 
        "gentle",
        "harsh",
        "magical",
        "mighty",
        "sonorous", 
        "strange",
        "stunning",
        "sweet",
        "terrific",
        "wonderful",
        "wondrous"
    ])

    twiml.gather({
        input: 'speech',
        actionOnEmptyResult: "true",
        speechTimeout: 'auto',
        action: '/3'
    }).say(`${name}, huh? What a ${nameDescriptor} name. It reminds me of ${namePhrase}. May I ask, who gave you that name?`);
        
    callback(null, twiml);
  };
