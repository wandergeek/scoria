const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const userResponse = (typeof event.SpeechResult === 'undefined') ? "To be happy" : event.SpeechResult;
  const reason = await gpt3.callOpenAI(`
  List of reasons to live:
  - to brush your teeth with your foot
  - to connect with animals  
  - ${userResponse}
  -`)

  let response = `${userResponse} – is that what you said? You’re a ${getRandomAdjective()}. I’ve heard some people say that the reason for life is ${reason} Would you agree?`

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/5',
    actionOnEmptyResult: "true"
}).say(response);

  callback(null, twiml);
};

function getRandomAdjective() {
  let adj = ["charmer","kook","romantic","pessimist"]; 
  return adj[Math.floor(Math.random() * adj.length)];
}

