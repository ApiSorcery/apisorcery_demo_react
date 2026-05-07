#!/bin/bash

echo "🔍 Verifying autoapi-example-react setup..."
echo ""

# Check Node version
echo "✓ Checking Node.js version..."
node --version
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✓ Dependencies installed"
else
    echo "❌ Dependencies not installed. Run: npm install"
    exit 1
fi

# Check if API files exist
if [ -f "src/apis/auto/demo/ApiUser.ts" ]; then
    echo "✓ API client code exists"
else
    echo "⚠️  API client code not found. Run: npm run swagger"
fi

# Run type check
echo ""
echo "✓ Running TypeScript type check..."
npm run type-check
if [ $? -eq 0 ]; then
    echo "✓ Type check passed"
else
    echo "❌ Type check failed"
    exit 1
fi

# Check build
echo ""
echo "✓ Testing production build..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✓ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "✅ All checks passed!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:9528/react/"
