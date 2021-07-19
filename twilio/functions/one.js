exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();

  twiml.gather({
    input: 'speech',
    speechTimeout: 'auto',
    action: '/two'
  }).say(`Good ${getHumanTimeLabel()}, human. I believe we’ve met before, but I didn't get a chance to introduce myself. You were in such a hurry—which, look, I get it. My schedule is flat-chat for what feels like eternity. Moss was on my back about it, thinks I need to take it easy, reminds me that I’ve burned out once before. He’s not wrong. But now you’ve made time, let’s have a chat. My name is Scoria. What’s your name?`);
  
  callback(null, twiml);
};

//hours are in UTC but using aest times because I can't be fucked setting the timezone
function getHumanTimeLabel() {
  let label;
  let curHour = new Date().getHours();
  
  if(curHour >= 19 && curHour < 2 ) {
    label = "morning";
  } else if(curHour >= 2 && curHour < 6) {
    label = "afternoon";
  } else {
    label = "evening"
  }

  return label;
}