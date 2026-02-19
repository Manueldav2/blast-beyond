#!/bin/bash
# Start Blast Beyond dev server on port 3002
# Usage: ./start-dev.sh

PORT=3002

# Kill any existing server on this port
lsof -ti :$PORT | xargs kill 2>/dev/null
sleep 1

echo "Starting Next.js dev server on port $PORT..."
echo "If it stalls, your system may be low on memory."
echo "  Tip: Close unused apps and run this script again."
echo ""

exec npx next dev -p $PORT
