const gpt3 = require(Runtime.getAssets()["/gpt3.js"].path);
const utils = require(Runtime.getAssets()["/utils.js"].path);

exports.handler = async(context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();

  if(typeof event.CallSid != 'undefined') { //callSID not defined when testing locally
    await context.getTwilioClient().calls(event.CallSid) 
    .recordings
    .create({
      recordingStatusCallback: `https://${context.DOMAIN_NAME}/recordEvents`
    })
    .then(recording => console.log(`created recording with sid ${recording.sid}`));
  }

  const creatures = await gpt3.callOpenAI(`
List of living things:
- Lizards and clouds
- Crows and wattle trees
- Creeks and caterpillars
-`)

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
  twiml.say(`After all, you must be a human. ${creatures} can't speak. Not in your strange tongue anyway.`)
  twiml.pause(0.2);

  let filler = utils.getRandomElement([
    "Hey, but I haven't even introduced myself properly.",
    "I think we've seen each other before, but I don't know your name.",
    "I believe we've met before, but not introduced ourselves."
  ]);

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    timeout: '6', //excessive value to test whether this attribute allows for slow replies w/o introducing delay for quick replies
    action: '/3',
    actionOnEmptyResult: "true",
    }).say(`${filler} My name is Scoria. What's yours?`);

  // If no response, skip the whole name beat.
  twiml.redirect({
    method: 'POST'
  }, '/4?responded=skip');

  callback(null, twiml);
};