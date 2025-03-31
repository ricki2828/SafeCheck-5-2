# Stripe and Certn Integration Guide

This guide explains how to set up the Stripe payment flow and Certn background check integration for your website.

## Prerequisites

- A Stripe account
- A Certn account
- Access to the project codebase
- Node.js and npm installed

## Environment Setup

1. Create a `.env` file in the root of your project (copy from `.env.example`)
2. Fill in the following environment variables:

```
# Stripe API Keys
VITE_STRIPE_PUBLIC_KEY=pk_test_yourstripepublickey
STRIPE_SECRET_KEY=sk_test_yourstripesecretkey
STRIPE_WEBHOOK_SECRET=whsec_yourstripwebhooksecret

# Certn API Keys
CERTN_API_KEY=your_certn_api_key
CERTN_API_URL=https://gateway.certn.co/api/v2

# App Configuration
APP_URL=http://localhost:8888
```

## Stripe Setup

1. **Create a Stripe Account**:
   - If you don't have one, sign up at [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)

2. **Get API Keys**:
   - Go to Developers > API Keys in the Stripe Dashboard
   - Copy your **Publishable key** to `VITE_STRIPE_PUBLIC_KEY`
   - Copy your **Secret key** to `STRIPE_SECRET_KEY`

3. **Set up Webhook**:
   - Go to Developers > Webhooks in the Stripe Dashboard
   - Click "Add endpoint"
   - For local testing, use a tool like [ngrok](https://ngrok.com/) to expose your local server
   - Set the endpoint URL to `https://your-domain/.netlify/functions/stripe-webhook`
   - Select the events to listen for:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
   - After creating the webhook, copy the **Signing Secret** to `STRIPE_WEBHOOK_SECRET`

## Certn Setup

1. **Create a Certn Account**:
   - If you don't have one, contact Certn sales

2. **Get API Keys**:
   - Log in to your Certn dashboard
   - Go to Settings > API Keys
   - Create a new API key with appropriate permissions
   - Copy the API key to `CERTN_API_KEY`

3. **Set up Webhook (if needed)**:
   - Go to Settings > Webhooks in the Certn Dashboard
   - Add a new webhook endpoint
   - Set the endpoint URL to `https://your-domain/.netlify/functions/certn-webhook`
   - Select the events to listen for (e.g., case status updates)

## Running the Application

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. For Netlify Function development, use Netlify CLI:
   ```
   npx netlify-cli dev
   ```

## Testing the Integration

1. **Test Stripe Payments**:
   - Use Stripe's test card numbers:
     - Success: `4242 4242 4242 4242`
     - Requires authentication: `4000 0025 0000 3155`
     - Declined: `4000 0000 0000 0002`
   - Use any future expiration date, any 3-digit CVC, and any postal code

2. **Test Certn Integration**:
   - After a successful test payment, check your Certn dashboard for new background checks
   - Check the logs in your Netlify Functions panel for webhook events

## Deployment

1. **Deploy to Netlify**:
   ```
   netlify deploy
   ```

2. **Set Environment Variables**:
   - Go to your Netlify site dashboard
   - Navigate to Site Settings > Build & Deploy > Environment
   - Add all the environment variables from your `.env` file

3. **Update Webhook URLs**:
   - After deployment, update your Stripe and Certn webhook URLs to point to your production domain 