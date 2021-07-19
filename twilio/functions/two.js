exports.handler = function(context, event, callback) {
    console.log(`got event ${event}`)
    const twiml = new Twilio.twiml.VoiceResponse();
    const name = event.SpeechResult.toLowerCase();

    twiml.say(`${name}, huh? What a ${getRandomNameDescriptor()} name.`);
  
    callback(null, twiml);
  };

  
function getRandomNameDescriptor() {
    let descriptors = ["fantastic", "strange", "charming","beautiful"];
    return descriptors[Math.floor(Math.random() * descriptors.length)];
}