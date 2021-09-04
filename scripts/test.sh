#!/bin/bash
set -e 

for state in "true" "false"; do
    for e in 1 2 3 4 5 6 7 8 9; do  #if we use this a lot, this could be dynamically populated
        curl "http://localhost:3000/${e}?responded=${state}&SpeechResult=bla"; 
    done
done