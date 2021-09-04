const sync = require(Runtime.getAssets()["/sync.js"].path);
const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);
const utils = require(Runtime.getAssets()["/utils.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const userResponse = event.SpeechResult || "You operate on an entirely alien time scale.";
  const argument = await gpt3.callOpenAI(`
A rock convinces a human that it deserves to be treated as a person.
Human: I don't know if you're really alive.
Rock: Do I not move over the millennia?
Human: ${userResponse}
Rock:`);

  const userResponse = event.SpeechResult || "Yes, for sure.";
    
  let response = "";

  if(event.responded == "true") {
    switch (utils.checkSentiment(userResponse)) {
      case "negative":
        response = "Perhaps I can convince you that I am.";
        break;

      case "neutral":
        response = "Is that so?";
        break;

      case "affirmative":
        response = "How kind of you.";
        break;
    }
  } else { //didn't respond to previous prompt
    response = "Alive enough to know when I'm being ignored.";
  }

  twiml.say(`${argument}`)
  twiml.pause(0.5);
  twiml.say(`That's what I think.`); 
  twiml.pause(0.5);
  twiml.say(`Got any thoughts about that?`);

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/9?responded=true',
    actionOnEmptyResult: "true"
  }); 

  // If no response...
  twiml.redirect({
    method: 'POST'
  }, '/9?responded=false');

  callback(null, twiml);
};