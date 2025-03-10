"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
}
const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }
    const sig = event.headers['stripe-signature'];
    try {
        const stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);
        // Handle the event
        switch (stripeEvent.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = stripeEvent.data.object;
                console.log('Payment succeeded:', paymentIntent.id);
                // Add your business logic here
                break;
            case 'payment_intent.payment_failed':
                const failedPayment = stripeEvent.data.object;
                console.log('Payment failed:', failedPayment.id);
                // Add your business logic here
                break;
            default:
                console.log(`Unhandled event type ${stripeEvent.type}`);
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ received: true }),
        };
    }
    catch (err) {
        console.error('Webhook Error:', err.message);
        return {
            statusCode: 400,
            body: `Webhook Error: ${err.message}`,
        };
    }
};
exports.handler = handler;
