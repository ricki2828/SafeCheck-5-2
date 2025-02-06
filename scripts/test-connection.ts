import * as dotenv from 'dotenv';
import * as https from 'https';

dotenv.config();

console.log('Script starting...');

// First verify the API key
const apiKey = process.env.VITE_CERTN_API_KEY;
if (!apiKey) {
  console.error('No API key found in environment variables');
  process.exit(1);
}
console.log('API Key found (first 4 chars):', apiKey.substring(0, 4) + '...');

// Try both sandbox and production endpoints
const endpoints = [
  'https://api.ca.sandbox.certn.co/api/public/cases/',
  'https://api.ca.certn.co/api/public/cases/'
];

const makeRequest = async (url: string) => {
  console.log(`Making request to ${url}...`);
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false // Only use this for testing!
    });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Api-Key ${apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'SafeCheck/1.0'
      },
      // @ts-ignore
      agent
    });

    console.log('Response received:');
    console.log('Status:', response.status);
    
    // Convert headers to a plain object for logging
    const headers: { [key: string]: string } = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    console.log('Headers:', headers);
    
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      console.log('Data:', data);
    } catch (e) {
      console.log('Non-JSON response:', text.substring(0, 100));
    }
  } catch (error) {
    console.error('Request failed:', {
      message: error.message,
      name: error.name,
      cause: error.cause,
      stack: error.stack
    });
  }
};

// Try each endpoint sequentially
Promise.all(endpoints.map(makeRequest))
  .finally(() => {
    console.log('Test complete');
    process.exit(0);
  }); 