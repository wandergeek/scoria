.PHONY: start
start: check-vars
	@ cd twilio && npm start

.PHONY: deploy
deploy: check-vars
	@ cd twilio && twilio serverless:deploy

.PHONY: test
test: check-vars
	@./scripts/test.sh

.PHONY: check-vars
check-vars: 
	@test -n "$(OPENAI_API_KEY)"  #$$OPENAI_API_KEY needs to be set
	@test -n "$(TWILIO_ACCOUNT_SID)"  #$$TWILIO_ACCOUNT_SID needs to be set
	@test -n "$(TWILIO_AUTH_TOKEN)"  #$$TWILIO_AUTH_TOKEN needs to be set