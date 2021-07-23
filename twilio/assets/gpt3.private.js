const axios = require('axios');

module.exports = {
    callOpenAI: async (prompt) => {
        console.log(`got prompt: ${prompt}`)
        const instance = axios.create({
        baseURL: 'https://api.openai.com/v1/',
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        });
    
        const completionParmas = {
        prompt: prompt,
        max_tokens: 75,
        temperature: 0.50,
        n: 1,
        stream: false,
        logprobs: null,
        echo: false,
        stop: '\n',
        };
    
        let botResponse;
        try {
        const result = await instance.post('/engines/davinci/completions', completionParmas);
        botResponse = result.data.choices[0].text.trim();
        console.log(`got response: ${botResponse}`)
        
        } catch (err) {
        botResponse = "Sorry, I'm tired. Can you call back later?"
        console.log(err);
        }
    
        return botResponse;
    }
};