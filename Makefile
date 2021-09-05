.PHONY: init
init: 
	npm install

.PHONY: start
start: check-vars
	@ if [ ! -d "node_modules" ]; then echo "Please run make init first"; exit 1; else npm start; fi
	

.PHONY: deploy
deploy: check-vars
	twilio serverless:deploy

.PHONY: test
test: check-vars
	@./scripts/test.sh

.PHONY: check-vars
check-vars: 
	@./scripts/check-vars.sh

.PHONY: logs
logs:
	twilio serverless:logs