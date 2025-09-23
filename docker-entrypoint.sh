#!/bin/sh

# Allows for the api url to be set at runtime. Enables the default `localhost` option to be
# used in development, and the production url to be set easily later on as an env variable. 

if [ -n "$NEXT_PUBLIC_API_URL" ]; then
  echo "Setting SERVICE_PUBLIC_API_URL to $NEXT_PUBLIC_API_URL"
  envsubst < /app/public/config/config.json > /app/public/config/config.runtime.json
else
  cp /app/public/config/config.json /app/public/config/config.runtime.json
fi

if [ "$APP_MODE" = "production" ]; then
  npm start
else
  npm run dev
fi
