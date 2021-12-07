#!/bin/bash

# Triggered when the user interrupts the script to stop it.
trap quitjobs INT
quitjobs() {
  echo ""
  pkill -P $$
  echo "Killed all running jobs".
  scriptCancelled="true"
  trap - INT
  exit
}

# Wait for user input so the jobs can be quit afterwards.
scriptCancelled="false"
waitForCancel() {
  while :
  do
    if [ "$scriptCancelled" == "true" ]; then
      return
    fi
  sleep 1
  done
}

export LOCAL_AOC_DEV=1

# The actual commands to execute.
http-server ./ -p 8585 --cors & \
npm run docs:dev

# Trap the input and wait for the script to be cancelled:
waitForCancel
return 0