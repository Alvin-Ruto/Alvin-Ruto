#!/bin/bash

# Deployment script for Alvin Kibet Portfolio
# This script prepares and deploys the portfolio to Vercel

echo "🚀 Starting deployment process..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found. Please run this script from the portfolio root directory."
    exit 1
fi

echo "✅ Found portfolio files"

# Install dependencies if package.json exists
if [ -f "package.json" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run any build steps (if needed)
echo "🔨 Running build process..."
npm run build 2>/dev/null || echo "No build step required"

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Your portfolio should be live at the URL provided above"
