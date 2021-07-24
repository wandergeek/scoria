const sync = require(Runtime.getAssets()["/sync.js"].path);
const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const userResponse = (typeof event.SpeechResult === 'undefined') ? "Na, not really." : event.SpeechResult;
  const argument = await gpt3.callOpenAI(`
A rock convinces a human that it deserves to be treated as a person.
Human: I don’t know if you’re really alive.
Rock: Do I not move over the millennia?
Human: ${userResponse}
Rock:`)

twiml.say(`${argument} What do you think?`);
twiml.pause({length: 4}); //there might be a better way to do this?

const statement = await gpt3.callOpenAI(`
List of questions about the future:
- If trees don’t breathe, what is left?
- If kangaroos were in your living room, would you turn away?
-`)

const farewell = await gpt3.callOpenAI(`
List of mysterious farewell statements:
- I will melt into the earth.
- May you commune with the moss.
-`)

twiml.say(`That may be so, but ${statement}. And that’s all I have to say on the matter. ${farewell}.`)
callback(null, twiml);
};
