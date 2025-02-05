import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  console.log('DEBUG - Request received:', {
    method: event.httpMethod,
    query: event.queryStringParameters
  });

  // Handle GET request (webhook verification)
  if (event.httpMethod === 'GET') {
    const challenge = event.queryStringParameters?.challenge;
    console.log('DEBUG - Challenge:', challenge);

    if (challenge) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/plain',
          'X-Content-Type-Options': 'nosniff'
        },
        body: challenge
      };
    }
  }

  return {
    statusCode: 400,
    body: 'Invalid request'
  };
};