const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();

  const statement = await gpt3.callOpenAI(`
List of questions about the future:
- If trees don't breathe, what is left?
- If kangaroos were in your living room, would you turn away?
-`)

  const farewell = await gpt3.callOpenAI(`
List of mysterious farewell statements:
- I will melt into the earth.
- May you commune with the moss.
-`)

  let response = "";
  if(event.responded == "true") {
    response = "That may be so, but ";
  } else { //didn't respond to previous prompt
    response = "If you don't want to chat, fine. , , . Regardless, ";
  }

  response += `${statement} , , ,. I will leave you that to ponder, , , . ${farewell}.`;

  twiml.say(response)
  twiml.pause(0.5);
  twiml.play(`https://${context.DOMAIN_NAME}/outro.wav`)
  callback(null, twiml);
};