"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
}
const stripe = new stripe_1.default(stripeSecretKey, {
    apiVersion: '2023-10-16',
});
const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'OK' }),
        };
    }
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Request body is empty' }),
            };
        }
        let amount;
        try {
            const data = JSON.parse(event.body);
            amount = data.amount;
        }
        catch (parseError) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid JSON in request body' }),
            };
        }
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Amount is required and must be a positive number' }),
            };
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount), // Ensure amount is an integer
            currency: 'cad',
            automatic_payment_methods: {
                enabled: true,
            },
        });
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                clientSecret: paymentIntent.client_secret,
            }),
        };
    }
    catch (error) {
        console.error('Payment intent creation error:', error);
        return {
            statusCode: error.statusCode || 400,
            headers,
            body: JSON.stringify({
                error: error.message || 'Payment intent creation failed',
            }),
        };
    }
};
exports.handler = handler;
