import { Handler } from '@netlify/functions';

interface CertnWebhookPayload {
  event: string;
  case_id: string;
  status: string;
  report_url?: string;
  estimated_completion_time?: string;
  created_at: string;
  // Add other fields as needed based on Certn's webhook documentation
}

export const handler: Handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    if (!event.body) {
      throw new Error('No webhook payload received');
    }

    const payload: CertnWebhookPayload = JSON.parse(event.body);
    console.log('Received webhook from Certn:', payload);

    // Handle different webhook events
    switch (payload.event) {
      case 'case.completed':
        // Background check is complete
        console.log('Background check completed:', payload.case_id);
        // Here you could:
        // 1. Store the result in your database
        // 2. Send additional notifications to the user
        // 3. Update your UI via a websocket if needed
        break;

      case 'case.failed':
        // Background check failed
        console.error('Background check failed:', payload.case_id);
        // Handle the failure (e.g., notify admin, retry, etc.)
        break;

      case 'case.updated':
        // Status update received
        console.log('Background check status updated:', payload.status);
        break;

      default:
        console.log('Unhandled webhook event:', payload.event);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ received: true }),
    };

  } catch (error) {
    console.error('Webhook processing error:', error);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'Failed to process webhook',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
}; 