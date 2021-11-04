const utils = require(Runtime.getAssets()["/utils.js"].path);

exports.handler = async(context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();

  if(event.responded == "true") {
    let adjective = utils.getRandomElement([
      "Silly",
      "Odd",
      "Strange",
      "Awkward"
    ]);
    response = `${adjective} question, I know.`;
  } else { //didn't respond to previous prompt
    response = `No need to answer.`;
  }

  twiml.say(response);
  twiml.pause(0.2);
  twiml.say(`After all, you must be a human.`)
  twiml.pause(0.2);

  let filler = utils.getRandomElement([
    "But I haven't even introduced myself.",
    "We've seen each other before, but I don't know your name.",
    "We've met before, but not introduced ourselves.",
    "Anyway,",
    "More human than me, anyway.",
    "Let's cut to the chase."
  ]);

  let name = utils.getRandomElement([
    "My name is Scoria. What's yours?",
    "My name is Scoria. Who am I speaking to?",
    "Some call me Scoria. What's your name?",
    "I'm Scoria. What's your name?"
  ]);

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/3?responded=true',
    }).say(`${filler} ${name}`);

  // If no response, skip the whole name beat.
  twiml.redirect({
    method: 'POST'
  }, '/4?responded=skip');

  callback(null, twiml);
};