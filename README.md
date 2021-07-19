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
export OPENAI_API_KEY=xxxxx
npm start
```

## Deploy
```
twilio serverless:deploy
```

## Todo
* ~~Use GPT3 for responses~~
* separate content from code
* record all interactions
* composite cody's sounds with voice

## Issues
* Most endpoints will not work locally since it requires an event argument. Will need to work out a way to inject these events.

Reference: https://www.twilio.com/docs/runtime/functions-assets-api/quickstart