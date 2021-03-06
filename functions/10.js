const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();

  const statement = await gpt3.callOpenAI(`
Questions about the future:
- If trees don't breathe, what is left?
- If kangaroos were in your living room, would you turn away?
-`);

  const farewell = await gpt3.callOpenAI(`
List of mysterious farewell statements:
- I will melt into the earth.
- May you commune with the moss.
-`);

  let response = "";
  if(event.responded == "true") {
    response = "OK. Whatever you say, ";
  } else { //didn't respond to previous prompt
    response = "If you haven't anything to say, fine, but ";
  }
  response += `${statement}`;

  twiml.say(response);
  twiml.pause(0.5);
  twiml.say(`I will leave you with that to ponder.`); 
  twiml.pause(0.8);
  twiml.say(`${farewell}`); 
  twiml.pause(0.5);
  twiml.play(`https://${context.DOMAIN_NAME}/outro.wav`)
  callback(null, twiml);
};