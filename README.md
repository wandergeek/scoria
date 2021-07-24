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
twilio login
```

## Test
```
cd twilio
echo OPENAI_API_KEY=XXXXXXX >> .env
echo ACCOUNT_SID=XXXXXXX >> .env
echo AUTH_TOKEN=XXXXXXX >> .env
npm start
curl http://localhost:3000/1 # example command
```

## Deploy

### Functions
```
cd twilio
twilio serverless:deploy
```

## To-do
* separate content from code
* composite cody's sounds with voice?
* proper error handling
     * to all sync functions
* investigate latency with an upsert operation to prevent errors when creating maps with the same name (or work out better way to do testing)
* Am I using async stuff right?
* is it possible to register other endpoints to the twilio functions so that everything can be consolidated?
* Add testing environment 
* identify previous callers
* add 'no response' conversation logic so bot doesn't plow ahead
* prevent skipping (or make transition more natural) when caller talks over the bot

### Low priority
* record from beginning of call rather than 1a
* add parameter to specify gpt model per prompt (default davinci, but some prompts might be fine with ada)

### Done
* ~Use GPT3 for responses~
* ~figure out a way to share state between functions or fold all functions together~
* ~create a class to help deal with gpt3 interactions~
* ~Make shared utility function for picking random element from array~
* ~record conversations~
* ~remove all static pauses~
* ~record all interactions~

## Issues
* ~Most endpoints will not work locally since it requires an event argument. Will need to work out a way to inject these events.~

## Reference
https://www.twilio.com/docs/runtime/functions-assets-api/quickstart