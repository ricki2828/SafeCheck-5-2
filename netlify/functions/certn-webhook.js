import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  // For GET requests (webhook verification)
  if (event.httpMethod === 'GET') {
    const challenge = event.queryStringParameters?.challenge;
    
    if (challenge) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/plain',
          'X-Content-Type-Options': 'nosniff'
        },
        body: challenge  // Return ONLY the challenge string
      };
    }
  }

  return {
    statusCode: 400,
    headers: {
      'Content-Type': 'text/plain'
    },
    body: 'Invalid request'
  };
};