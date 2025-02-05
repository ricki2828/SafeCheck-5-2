import { Handler } from '@netlify/functions';

interface CertnWebhookPayload {
  event: string;
  case_id: string;
  status: string;
  report_url?: string;
  estimated_completion_time?: string;
  created_at: string;
  challenge_string?: string;  // Added for verification
  // Add other fields as needed based on Certn's webhook documentation
}

export const handler: Handler = async (event) => {
  // Log all incoming requests for debugging
  console.log('Incoming request:', {
    method: event.httpMethod,
    query: event.queryStringParameters,
    body: event.body,
    headers: event.headers
  });

  const headers = {
    'Content-Type': 'text/plain',  // Changed to text/plain
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle GET request (initial verification)
  if (event.httpMethod === 'GET') {
    const challengeString = event.queryStringParameters?.challenge_string;
    console.log('Received challenge string:', challengeString);

    if (challengeString) {
      return {
        statusCode: 200,
        headers,
        body: challengeString  // Return just the string
      };
    }
  }

  // Handle POST request
  if (event.httpMethod === 'POST') {
    try {
      if (event.body) {
        const payload = JSON.parse(event.body);
        console.log('Received webhook payload:', payload);

        // Handle challenge in POST request
        if (payload.challenge_string) {
          return {
            statusCode: 200,
            headers,
            body: payload.challenge_string  // Return just the string
          };
        }

        // Handle normal webhook events
        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ received: true })
        };
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
    }
  }

  // Handle OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  return {
    statusCode: 400,
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Invalid request' })
  };
}; 