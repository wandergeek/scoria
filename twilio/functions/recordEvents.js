const axios = require('axios')

exports.handler = async(context, event, callback) => {
    const recordingUrl = event.RecordingUrl || "https://lol.com/blah";
    const message = { content: `got a new call ${recordingUrl}.mp3` };
    const headers = { headers: {'Content-Type': 'application/json'} };
    
    try {
        const resp = await axios.post(context.DISCORD_WEBHOOK, message, headers);
        console.log(resp.data);
    } catch (err) {
        console.error(err);
    }

    callback(null,null);
}