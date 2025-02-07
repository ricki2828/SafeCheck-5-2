import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { code } = JSON.parse(event.body || '{}');

    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Promotion code is required' }),
      };
    }

    // Retrieve the promotion code from Stripe
    const promotionCodes = await stripe.promotionCodes.list({
      code,
      active: true,
      limit: 1,
    });

    const promotionCode = promotionCodes.data[0];

    if (!promotionCode) {
      return {
        statusCode: 404,
        body: JSON.stringify({ 
          valid: false,
          error: 'Invalid promotion code' 
        }),
      };
    }

    // Check if the promotion code is valid
    if (!promotionCode.active) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          valid: false,
          error: 'Promotion code is not active' 
        }),
      };
    }

    // Get the coupon details
    const coupon = await stripe.coupons.retrieve(promotionCode.coupon.id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        valid: true,
        promotionCode: promotionCode.id,
        coupon: {
          id: coupon.id,
          name: coupon.name,
          amountOff: coupon.amount_off,
          percentOff: coupon.percent_off,
          currency: coupon.currency,
        }
      }),
    };

  } catch (error) {
    console.error('Error validating promotion:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        valid: false,
        error: 'Error validating promotion code' 
      }),
    };
  }
}; 