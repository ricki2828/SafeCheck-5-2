import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  // Log everything
  console.log('DEBUG - Full event:', {
    method: event.httpMethod,
    path: event.path,
    query: event.queryStringParameters,
    headers: event.headers,
    rawQuery: event.rawQuery
  });

  // For GET requests (webhook verification)
  if (event.httpMethod === 'GET') {
    const challenge = event.queryStringParameters?.challenge;
    console.log('DEBUG - Challenge value:', challenge);

    // Always log what we're returning
    console.log('DEBUG - Responding with:', challenge || 'no challenge found');

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

  // Log error case
  console.log('DEBUG - Invalid request received');
  return {
    statusCode: 400,
    body: 'Invalid request'
  };
};