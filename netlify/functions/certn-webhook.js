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
  console.log('Received request:', {
    method: event.httpMethod,
    query: event.queryStringParameters,
    body: event.body,
    headers: event.headers
  });

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Handle GET request (initial verification)
  if (event.httpMethod === 'GET') {
    const challengeString = event.queryStringParameters?.challenge_string;
    console.log('Received challenge string:', challengeString);

    if (challengeString) {
      return {
        statusCode: 200,
        headers,
        body: challengeString // Return the raw challenge string
      };
    }
  }

  // Handle POST requests (actual webhooks)
  if (event.httpMethod === 'POST' && event.body) {
    try {
      const payload = JSON.parse(event.body);
      console.log('Received webhook payload:', payload);

      // Handle challenge in POST request
      if (payload.challenge_string) {
        return {
          statusCode: 200,
          headers,
          body: payload.challenge_string // Return the raw challenge string
        };
      }

      // Verify the webhook is coming from Certn (you should implement proper verification)
      // if (!verifyWebhookSignature(event)) {
      //   throw new Error('Invalid webhook signature');
      // }

      // Handle different webhook events
      switch (payload.event) {
        case 'case.completed':
          console.log(`Background check completed for case ${payload.case_id}`);
          if (payload.report_url) {
            console.log(`Report available at: ${payload.report_url}`);
          }
          // Here you could:
          // 1. Store the result in your database
          // 2. Send additional notifications to the user
          // 3. Update your UI via a websocket if needed
          break;

        case 'case.failed':
          console.error(`Background check failed for case ${payload.case_id}`);
          // Handle the failure (e.g., notify admin, retry, etc.)
          break;

        case 'case.updated':
          console.log(`Status update for case ${payload.case_id}: ${payload.status}`);
          break;

        default:
          console.log(`Unhandled webhook event: ${payload.event}`);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ received: true })
      };
    } catch (error) {
      console.error('Error processing webhook:', error);
    }
  }

  // Default response for unhandled cases
  return {
    statusCode: 400,
    headers,
    body: JSON.stringify({ error: 'Invalid request' })
  };
}; 