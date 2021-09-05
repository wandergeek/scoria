#!/bin/bash

VARS="OPENAI_API_KEY TWILIO_ACCOUNT_SID TWILIO_AUTH_TOKEN"
for var in $VARS; do
    if [[ -z "${!var}" ]]; then
        echo "Variable $var not set!"
        exit 1
    fi
done