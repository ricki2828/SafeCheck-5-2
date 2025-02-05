"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    try {
        // Handle GET request for webhook verification
        if (event.httpMethod === 'GET') {
            const params = new URLSearchParams(event.rawQuery);
            const challengeString = params.get('challenge_string');
            if (challengeString) {
                console.log('Received challenge string:', challengeString);
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({ challenge_string: challengeString })
                };
            }
        }
        // Handle POST request for actual webhooks
        if (event.httpMethod === 'POST') {
            if (!event.body) {
                throw new Error('No webhook payload received');
            }
            const payload = JSON.parse(event.body);
            console.log('Processed webhook payload:', payload);
            // Handle challenge string in POST request as well
            if (payload.challenge_string) {
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({ challenge_string: payload.challenge_string })
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
        }
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ received: true }),
        };
    }
    catch (error) {
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
exports.handler = handler;
