#!/bin/bash
set -e

# Run migrations
echo "Running migrations..."
npm run migrate

# Start the app
if [ "$NODE_ENV" = "production" ]; then
  echo "Starting app..."
  npm run prod
elif [ "$NODE_ENV" = "development" ]; then
  echo "Starting app..."
  npm run dev
else
  echo "Error: NODE_ENV must be set to 'production' or 'development' in '.env'"
fi