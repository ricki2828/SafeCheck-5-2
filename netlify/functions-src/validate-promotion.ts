import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const code = body.code as string;

    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ valid: false, message: 'Promotion code is required' })
      };
    }

    // First retrieve the promotion code
    const promotionCode = await stripe.promotionCodes.list({
      code: code,
      active: true,
      limit: 1
    });

    if (!promotionCode.data.length) {
      return {
        statusCode: 400,
        body: JSON.stringify({ valid: false, message: 'Invalid promotion code' })
      };
    }

    const promoCode = promotionCode.data[0];

    // Check if the promotion code has expired
    if (promoCode.expires_at && promoCode.expires_at < Math.floor(Date.now() / 1000)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ valid: false, message: 'Promotion code has expired' })
      };
    }

    // Check if the promotion code has reached its maximum redemption count
    if (promoCode.max_redemptions && 
        promoCode.times_redeemed >= promoCode.max_redemptions) {
      return {
        statusCode: 400,
        body: JSON.stringify({ valid: false, message: 'Promotion code has been fully redeemed' })
      };
    }

    // If we get here, the promotion code is valid
    return {
      statusCode: 200,
      body: JSON.stringify({
        valid: true,
        promotion_code: promoCode.id,
        coupon: {
          id: promoCode.coupon.id,
          percent_off: promoCode.coupon.percent_off,
          amount_off: promoCode.coupon.amount_off,
          currency: promoCode.coupon.currency
        }
      })
    };

  } catch (error) {
    console.error('Error validating promotion code:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ valid: false, message: 'Error processing promotion code' })
    };
  }
};

export { handler }; 