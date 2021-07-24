const axios = require('axios')

exports.handler = async(context, event, callback) => {
    const failure = event.Payload || "{\"resource_sid\":\"ZH7af7d8e2400dd20d46b1c40e24411a2b\",\"service_sid\":\"ZSb5b1d10538c7438f9cdc16827f3c2b12\"}";
    const failureParsed = JSON.parse(failure)
    const debugID = event.Sid || "NO6c5834f610dd5c05b2d32b7c922bbea5";

    const message = { content: `
**Error detected** :boom:  \`\`\` ${JSON.stringify(failureParsed, null, 2)} \`\`\`
https://www.twilio.com/console/debugger/${debugID}`};
    const headers = { headers: {'Content-Type': 'application/json'} };
    
    try {
        const resp = await axios.post(context.DISCORD_FAIL_WEBHOOK, message, headers);
        console.log(resp.data);
    } catch (err) {
        console.error(err);
    }

    callback(null,null);
}