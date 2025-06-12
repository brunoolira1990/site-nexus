import dotenv from 'dotenv';
import path from 'path';

// Explicitly point to the .env file in the server's root directory (where package.json is)
const envPath = path.resolve(process.cwd(), '.env');
const result = dotenv.config({ path: envPath });

console.log('--- Checking Environment Variables ---');
console.log('Looking for .env file at:', envPath);

if (result.error) {
  console.log('\nError: Could not load .env file.');
  console.log('Details:', result.error.message);
} else {
  if(result.parsed && Object.keys(result.parsed).length > 0) {
    console.log('\nSuccess: .env file loaded.');
    console.log('DATABASE_URL found:', process.env.DATABASE_URL || '===> NOT FOUND! <===');
  } else {
    console.log('\nWarning: .env file was found, but it might be empty or malformed.');
  }
}

console.log('------------------------------------'); 