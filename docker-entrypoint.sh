#!/bin/sh

# Allows for the API URL to be set at runtime
if [ -n "$NEXT_PUBLIC_API_URL" ]; then
  echo "Setting SERVICE_PUBLIC_API_URL to $NEXT_PUBLIC_API_URL"
  envsubst < /app/public/config/config.json > /app/public/config/config.runtime.json
else
  cp /app/public/config/config.json /app/public/config/config.runtime.json
fi

# Let CMD in Dockerfile start the app
exec "$@"
