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

twiml.say(`That may be so, but ${statement}. And that's all I have to say on the matter. ${farewell}.`)
callback(null, twiml);
};
