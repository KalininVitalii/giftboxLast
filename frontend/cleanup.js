#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Cleaning up project dependencies...\n');

// Remove node_modules and package-lock.json
console.log('1. Removing existing dependencies...');
if (fs.existsSync('node_modules')) {
  fs.rmSync('node_modules', { recursive: true, force: true });
  console.log('   ✓ Removed node_modules');
}

if (fs.existsSync('package-lock.json')) {
  fs.rmSync('package-lock.json');
  console.log('   ✓ Removed package-lock.json');
}

if (fs.existsSync('yarn.lock')) {
  fs.rmSync('yarn.lock');
  console.log('   ✓ Removed yarn.lock');
}

// Install only necessary dependencies
console.log('\n2. Installing optimized dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('   ✓ Dependencies installed successfully');
} catch (error) {
  console.error('   ✗ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Build the project to test optimizations
console.log('\n3. Building project to test optimizations...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('   ✓ Build completed successfully');
} catch (error) {
  console.error('   ✗ Build failed:', error.message);
  process.exit(1);
}

console.log('\n🎉 Project cleanup completed successfully!');
console.log('\n📊 To analyze your bundle size, run: npm run analyze');
console.log('🚀 To start development server: npm start');
console.log('\n💡 Check OPTIMIZATION.md for detailed information about the changes.');
