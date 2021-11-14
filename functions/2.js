const utils = require(Runtime.getAssets()["/utils.js"].path);

exports.handler = async(context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();

  if(event.responded == "true") {
    let adjective = utils.getRandomElement([
      "Silly",
      "Strange",
      "Awkward"
    ]);
    response = `${adjective} of me to ask, I know.`;
  } else { //didn't respond to previous prompt
    response = `No need to answer.`;
  }

  twiml.say(response);
  twiml.pause(0.2);
  twiml.say(`I think I can trust you.`)
  twiml.pause(0.2);

  let filler = utils.getRandomElement([
    "But I haven't even introduced myself.",
    "But I don't know who you are.",
    "You seem like a harmless bag of meat.",
    "Let's cut to the chase.",
    "And you can trust me, of course.",
    "As much as any human can be trusted."
  ]);

  let name = utils.getRandomElement([
    "My name is Scoria. What's yours?",
    "You can call me Scoria. What should I call you?"
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