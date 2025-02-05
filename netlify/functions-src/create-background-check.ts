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
  // Add other fields as needed
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
    
    // Create the case with the Canadian Criminal Check package
    const certnResponse = await fetch('https://api.sandbox.certn.co/api/v3/cases/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CERTN_KEY}`,
        'Content-Type': 'application/json',
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

    if (!certnResponse.ok) {
      const errorData = await certnResponse.json();
      console.error('Certn API error details:', errorData);
      throw new Error(`Certn API error: ${JSON.stringify(errorData)}`);
    }

    const result = await certnResponse.json() as CertnResponse;

    // Log the successful case creation
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
    console.error('Background check error:', error);
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