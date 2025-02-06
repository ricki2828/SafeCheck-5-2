import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

interface CertnRequestBody {
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: {
    street_address: string;
    city: string;
    country: string;
    postal_code: string;
    province: string;
  };
}

interface CertnResponse {
  id: string;
  status: string;
  estimated_completion_time: string;
  created_at: string;
  updated_at: string;
}

export const handler: Handler = async (event) => {
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
      throw new Error('Request body is empty');
    }

    const data: CertnRequestBody = JSON.parse(event.body);
    
    // Add logging to see what we're sending
    console.log('Sending to Certn:', {
      url: 'https://api.sandbox.certn.co/api/public/cases/order-package/',
      headers: {
        'Authorization': 'Bearer [REDACTED]',
        'Content-Type': 'application/json',
      },
      body: {
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        date_of_birth: data.date_of_birth,
        address: data.address,
        package_type: 'canadian_criminal_check',
        consent: true,
        send_email: true,
        email_language: 'en',
        webhook_url: process.env.SITE_URL + '/.netlify/functions/certn-webhook',
      }
    });

    const certnResponse = await fetch('https://api.sandbox.certn.co/api/public/cases/order-package/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CERTN_API_KEY}`,
      },
      body: JSON.stringify({
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        date_of_birth: data.date_of_birth,
        address: {
          street_address: data.address.street_address,
          city: data.address.city,
          country: data.address.country || 'CA',
          postal_code: data.address.postal_code,
          province: data.address.province,
        },
        package_type: 'canadian_criminal_check',
        consent: true,
        send_email: true,
        email_language: 'en',
        webhook_url: process.env.SITE_URL + '/.netlify/functions/certn-webhook',
      }),
    });

    // Add detailed error logging
    if (!certnResponse.ok) {
      const errorBody = await certnResponse.text();
      console.error('Certn API error response:', {
        status: certnResponse.status,
        statusText: certnResponse.statusText,
        body: errorBody,
        requestUrl: certnResponse.url
      });
      
      throw new Error(`Certn API error: ${certnResponse.status} - ${errorBody}`);
    }

    const result = (await certnResponse.json()) as CertnResponse;
    console.log('Certn case created:', result);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Background check initiated successfully',
        caseId: result.id,
        status: result.status,
        estimatedCompletionTime: result.estimated_completion_time,
      }),
    };

  } catch (error: any) {
    console.error('Background check error details:', error);
    return {
      statusCode: error.response?.status || 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to initiate background check',
        details: error.response?.data || {},
      }),
    };
  }
}; 