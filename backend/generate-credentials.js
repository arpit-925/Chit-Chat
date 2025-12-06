#!/usr/bin/env node

/**
 * Secure Credential Generator
 * 
 * This script generates secure credentials for:
 * - JWT Secret (32 bytes hex)
 * - Database Password (32 bytes hex)
 * 
 * Run with: node generate-credentials.js
 */

const crypto = require('crypto');

function generateSecureSecret(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

console.log('🔐 Secure Credential Generator\n');
console.log('=' .repeat(60));

// Generate JWT Secret
const jwtSecret = generateSecureSecret(32);
console.log('\n🔑 JWT_SECRET (copy this):');
console.log(jwtSecret);

// Generate Database Password
const dbPassword = generateSecureSecret(32);
console.log('\n🗝️  DATABASE PASSWORD (copy this):');
console.log(dbPassword);

// Generate Cloudinary API Secret (simulated)
const cloudinarySecret = generateSecureSecret(32);
console.log('\n☁️  CLOUDINARY API SECRET (copy this):');
console.log(cloudinarySecret);

console.log('\n' + '='.repeat(60));
console.log('\n✅ Copy these to your .env file:');
console.log(`
JWT_SECRET=${jwtSecret}
MONGODB_PASSWORD=${dbPassword}
CLOUDINARY_API_SECRET=${cloudinarySecret}
`);

console.log('⚠️  IMPORTANT:');
console.log('  • Save these in a secure password manager (1Password, LastPass, etc.)');
console.log('  • Never commit .env file to git');
console.log('  • Use these values when rotating credentials on MongoDB Atlas and Cloudinary');
console.log('\n');
