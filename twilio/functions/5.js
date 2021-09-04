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
-`);

  let response = "";

  if(event.responded == "true") {
    let description = utils.getRandomElement([
      "a charming",
      "an imaginative",
      "a romantic",
      "a pessimistic"
  ]);
    response = `${userResponse}, eh? What a curious idea. You're ${description} human, that's for sure.`;
  } else { //didn't respond to previous prompt
    response = `No strong thoughts? How strange. You're part of this world too, you know.`;
  }

  twiml.say(response);
  twiml.pause(0.5);
  twiml.say(`Humour me by answering another question. Some people say the best use of a day is ${reason}.`)
  twiml.pause(0.5);
  twiml.say(`What do you think?`)
  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/6?responded=true',
  });

  // If no response...
  twiml.redirect({
    method: 'POST'
  }, '/6?responded=false');

  callback(null, twiml);
};