import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

interface PaymentIntentMetadata {
  packageId: string;
  email: string;
  firstName: string;
  lastName: string;
  requiresCertnIntegration: string;
  promotionCode?: string;
}

export const handler: Handler = async (event) => {
  // Handle CORS preflight requests
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
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    let data;
    try {
      data = JSON.parse(event.body);
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      };
    }

    const { amount, email, packageId = 'standard_check', formData = {}, promotionCode } = data;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Amount must be a positive number' }),
      };
    }

    console.log('Creating payment intent with amount:', amount);
    
    // Prepare customer data for potential future use with Certn
    const customerInfo = {
      email: typeof email === 'string' && email.length > 0 ? email : undefined,
      name: typeof formData.firstName === 'string' ? formData.firstName : undefined,
      phone: typeof formData.phoneNumber === 'string' ? formData.phoneNumber : undefined,
    };
    
    // Create or retrieve a customer
    let customer;
    if (customerInfo.email) {
      const customers = await stripe.customers.list({
        email: customerInfo.email,
        limit: 1,
      });
      
      if (customers.data.length > 0) {
        customer = customers.data[0];
        // Update customer if we have new info
        if (customerInfo.name || customerInfo.phone) {
          customer = await stripe.customers.update(customer.id, {
            name: customerInfo.name || customer.name,
            phone: customerInfo.phone || customer.phone,
          });
        }
      } else {
        customer = await stripe.customers.create({
          email: customerInfo.email,
          name: customerInfo.name,
          phone: customerInfo.phone,
        });
      }
    }

    // Validate promotion code if provided
    let discount = 0;
    let skipPayment = false;
    let finalAmount = amount;
    
    if (promotionCode) {
      console.log(`Attempting to validate promotion code: ${promotionCode}`);
      try {
        const promotionCodeObj = await stripe.promotionCodes.list({
          code: promotionCode,
          active: true,
          limit: 1,
        });
        console.log('Stripe promotion code lookup result:', JSON.stringify(promotionCodeObj));

        if (!promotionCodeObj.data.length) {
          console.log('No active promotion code found matching the provided code.');
          throw new Error('Invalid promotion code');
        }

        const coupon = await stripe.coupons.retrieve(promotionCodeObj.data[0].coupon.id);
        console.log('Retrieved coupon details:', JSON.stringify(coupon));

        if (coupon.percent_off) {
          discount = coupon.percent_off;
          console.log(`Applying percentage discount: ${discount}%`);
          finalAmount = Math.round(amount * ((100 - discount) / 100));
        } else if (coupon.amount_off) {
          // amount_off is in cents
          discount = coupon.amount_off;
          console.log(`Applying fixed discount: $${discount / 100}`);
          finalAmount = Math.max(0, amount - discount);
        } else {
           console.log('Coupon found, but has no percent_off or amount_off value.');
        }

        console.log('Original amount:', amount / 100);
        console.log('Discount applied:', discount);
        console.log('Final amount:', finalAmount / 100);

        // If amount is 0 after discount, skip payment
        if (finalAmount <= 0) {
          console.log('Amount is 0 or less after discount, skipping payment');
          skipPayment = true;
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ skipPayment: true })
          };
        }
      } catch (error: any) {
        console.error('Error processing promotion code:', error.message);
        // We will let the process continue without a discount, but log the error
        // throw new Error(`Invalid promotion code: ${error.message}`); // Commenting out the throw for now
      }
    } else {
      console.log('No promotion code provided in the request.');
    }

    // Only create payment intent if we need payment
    if (!skipPayment) {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: finalAmount,
          currency: 'cad',
          automatic_payment_methods: {
            enabled: true,
          },
          customer: customer?.id,
          receipt_email: customerInfo.email,
          metadata: {
            email: customerInfo.email,
            packageId: packageId || '',
            originalAmount: amount,
            discount,
            promotionCode: promotionCode || '',
            ...formData
          }
        });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            clientSecret: paymentIntent.client_secret,
            amount: finalAmount,
          }),
        };
      } catch (error: any) {
        console.error('Error creating payment intent:', error);
        throw new Error(`Error creating payment intent: ${error.message}`);
      }
    }

    throw new Error('Unexpected end of function');
  } catch (error) {
    console.error('Payment intent creation error:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return {
        statusCode: error.statusCode || 400,
        headers,
        body: JSON.stringify({
          error: error.message,
          type: error.type,
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'An unexpected error occurred while processing your payment',
      }),
    };
  }
};