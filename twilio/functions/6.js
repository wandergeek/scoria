const sync = require(Runtime.getAssets()["/sync.js"].path);
const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const userResponse = event.SpeechResult || "You operate on an entirely alien time scale.";
  const argument = await gpt3.callOpenAI(`
A rock convinces a human that it deserves to be treated as a person.
Human: I don't know if you're really alive.
Rock: Do I not move over the millennia?
Human: ${userResponse}
Rock:`)

  twiml.say(`${argument} , , ,. That's what I think.`)
  twiml.pause(0.5);
  twiml.say(`Have you any thoughts about that?`);

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/7?responded=true',
    actionOnEmptyResult: "true"
  }); 

  callback(null, twiml);
};