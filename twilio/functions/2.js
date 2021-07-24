const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);
const sync = require(Runtime.getAssets()["/sync.js"].path);

exports.handler = async(context, event, callback) => {
    const twiml = new Twilio.twiml.VoiceResponse();
    const name = (typeof event.SpeechResult === 'undefined') ? "Gary" : event.SpeechResult;
    const callSid = (typeof event.CallSid === 'undefined') ? "12345" : event.CallSid.slice(-10);

    const namePhrase = await gpt3.callOpenAI(`
List of things that sound like a name:
- a tiger's roar
- a violin being tuned
- the drone of cicadas
-`)

    await sync.addKVtoSyncMap(context.getTwilioClient(),context.SYNC_SVC_SID,callSid, "name", name)
    
    twiml.gather({
        input: 'speech',
        actionOnEmptyResult: "true",
        speechTimeout: 'auto',
        action: '/3'
    }).say(`${name}, huh? What a ${getRandomNameDescriptor()} name. It reminds me of ${namePhrase}. May I ask, who gave you that name?`);
        
    callback(null, twiml);
  };

function getRandomNameDescriptor() {
    let descriptors = ["fantastic", "strange", "charming","beautiful", "sonorous", "harsh","gentle"];
    return descriptors[Math.floor(Math.random() * descriptors.length)];
}
