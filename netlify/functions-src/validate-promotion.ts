import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    // First retrieve the promotion code
    const promotionCode = await stripe.promotionCodes.list({
      code: code,
      active: true,
      limit: 1
    });

    if (!promotionCode.data.length) {
      return new Response(
        JSON.stringify({ valid: false, message: 'Invalid promotion code' }),
        { status: 400 }
      );
    }

    const promoCode = promotionCode.data[0];

    // Check if the promotion code has expired
    if (promoCode.expires_at && promoCode.expires_at < Math.floor(Date.now() / 1000)) {
      return new Response(
        JSON.stringify({ valid: false, message: 'Promotion code has expired' }),
        { status: 400 }
      );
    }

    // Check if the promotion code has reached its maximum redemption count
    if (promoCode.max_redemptions && 
        promoCode.times_redeemed >= promoCode.max_redemptions) {
      return new Response(
        JSON.stringify({ valid: false, message: 'Promotion code has been fully redeemed' }),
        { status: 400 }
      );
    }

    // If we get here, the promotion code is valid
    return new Response(JSON.stringify({
      valid: true,
      promotion_code: promoCode.id,
      coupon: {
        id: promoCode.coupon.id,
        percent_off: promoCode.coupon.percent_off,
        amount_off: promoCode.coupon.amount_off,
        currency: promoCode.coupon.currency
      }
    }), { status: 200 });

  } catch (error) {
    console.error('Error validating promotion code:', error);
    return new Response(
      JSON.stringify({ valid: false, message: 'Error processing promotion code' }),
      { status: 500 }
    );
  }
} 