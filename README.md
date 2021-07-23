```
                          .__        
  ______ ____  ___________|__|____   
 /  ___// ___\/  _ \_  __ \  \__  \  
 \___ \\  \__(  <_> )  | \/  |/ __ \_
/____  >\___  >____/|__|  |__(____  /
     \/     \/                    \/ 
```



#### Human-rock symbiosis


## Setup
```
brew tap twilio/brew && brew install twilio
twilio plugins:install @twilio-labs/plugin-serverless
twilio login #ask nick for deets
```

## Test
```
cd twilio
echo OPENAI_API_KEY=xxxxx >> .env #ask nick for deets
npm start
```

## Deploy

### Functions
```
cd twilio
twilio serverless:deploy
```


## Todo
* ~~Use GPT3 for responses~~
* separate content from code
* record all interactions
* composite cody's sounds with voice?
* figure out a way to share state between functions or fold all functions together
     * required to randomise voice 
* ~~create a class to help deal with gpt3 interactions~~
* proper error handling
     * to all sync functions
* investigate latency with an upsert operation to prevent errors when creating maps with the same name (or work out better way to do testing)
* Am I using async stuff right?

## Issues
* Most endpoints will not work locally since it requires an event argument. Will need to work out a way to inject these events.

Reference: https://www.twilio.com/docs/runtime/functions-assets-api/quickstart