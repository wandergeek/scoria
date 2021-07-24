const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);
const utils = require(Runtime.getAssets()["/utils.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const userResponse = event.SpeechResult || "to levitate among mortals";
  const reason = await gpt3.callOpenAI(`
  List of reasons to live:
  - to brush your teeth with your foot
  - to connect with animals  
  - ${userResponse}
  -`)

  let randomAdjective = utils.getRandomElement([
    "charmer",
    "kook",
    "romantic",
    "pessimist"
])

  let response = `${userResponse} – is that what you said? You’re a ${randomAdjective}, that's for sure. On the other hand, I’ve heard people say that the reason for life is ${reason}. Would you agree?`

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/5',
    actionOnEmptyResult: "true"
}).say(response);

  callback(null, twiml);
};