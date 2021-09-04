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
twilio serverless:logs # run periodically to get logs
```

## To-do

* add testing environment 
* proper error handling
     * to all sync functions
* investigate latency with an upsert operation to prevent errors when creating maps with the same name (or work out better way to do testing)
* check whether async stuff is being used correctly
* prevent skipping (or make transition more natural) when caller talks over the bot
* add metrics for 
    * total words detected

### Low priority
* record from beginning of call rather than 1a
* add parameter to specify gpt model per prompt
* separate content from code
* composite cody's sounds with voice?
* identify previous callers
* add caller name to notifications to distinguish them more easily

### Done
* ~use GPT3 for responses~
* ~figure out a way to share state between functions or fold all functions together~
* ~create a class to help deal with gpt3 interactions~
* ~make shared utility function for picking random element from array~
* ~record conversations~
* ~remove all static pauses~
* ~record all interactions~
* ~add 'no response' conversation logic so bot doesn't plow ahead~
* ~metrics: length of call~

## Reference
https://www.twilio.com/docs/runtime/functions-assets-api/quickstart