```
.▄▄ ·  ▄▄·       ▄▄▄  ▪   ▄▄▄· 
▐█ ▀. ▐█ ▌▪▪     ▀▄ █·██ ▐█ ▀█ 
▄▀▀▀█▄██ ▄▄ ▄█▀▄ ▐▀▀▄ ▐█·▄█▀▀█ 
▐█▄▪▐█▐███▌▐█▌.▐▌▐█•█▌▐█▌▐█ ▪▐▌
 ▀▀▀▀ ·▀▀▀  ▀█▄▀▪.▀  ▀▀▀▀ ▀  ▀ 
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
npm start
```

## Deploy
```
twilio serverless:deploy
```

## Todo
* Use GPT3 for responses
* separate content from code
* record all interactions
* composite cody's sounds with voice

## Issues
* two.js will not work locally since it requires an event. Not sure how to test this. 

Reference: https://www.twilio.com/docs/runtime/functions-assets-api/quickstart