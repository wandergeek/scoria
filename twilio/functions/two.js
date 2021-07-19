exports.handler = function(context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
    const name = event.SpeechResult.toLowerCase();

    twiml.gather({
        input: 'speech',
        speechTimeout: 'auto',
        action: '/three'
    }).say(`${name}, huh? What a ${getRandomNameDescriptor()} name. Look, let me be straight with you. I have an important question to ask. Think for a moment before you answer. Tell me: are you alive?`);
  
    callback(null, twiml);
  };

function getRandomNameDescriptor() {
    let descriptors = ["fantastic", "strange", "charming","beautiful"];
    return descriptors[Math.floor(Math.random() * descriptors.length)];
}