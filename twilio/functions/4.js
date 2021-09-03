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

  let response = "";

  if(event.responded == "true") {
    let randomAdjective = utils.getRandomElement([
      "charmer",
      "kook",
      "romantic",
      "pessimist"
  ]);
    response = `${userResponse}, eh? What a curious idea. You're a ${randomAdjective}, that's for sure. On the other hand, `;
  }

  response += `I've heard people say that the reason for life is ${reason}.`

  twiml.say(response)
  twiml.pause(0.5);
  twiml.say(`What do you think about that?`)
  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/5?responded=true',
});

twiml.say(`I'm sorry you don't feel comfortable talking to me. You and I are more alike than you might think.`);
twiml.redirect({
  method: 'POST'
}, '/5?responded=false');


  callback(null, twiml);
};