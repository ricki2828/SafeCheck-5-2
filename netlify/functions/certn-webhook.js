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

    // Log the raw webhook data
    console.log('Raw webhook payload:', event.body);

    const payload: CertnWebhookPayload = JSON.parse(event.body);
    console.log('Processed webhook payload:', payload);

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
      body: JSON.stringify({
        received: true,
        event: payload.event,
        case_id: payload.case_id,
      }),
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