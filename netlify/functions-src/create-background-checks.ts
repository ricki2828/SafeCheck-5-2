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
    
    // Make request to Certn API
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
        // Add any additional required fields based on Certn's API documentation
      }),
    });

    if (!certnResponse.ok) {
      const errorData = await certnResponse.json();
      throw new Error(`Certn API error: ${JSON.stringify(errorData)}`);
    }

    const result = await certnResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Background check initiated successfully',
        caseId: result.id,
        // Include any other relevant response data
      }),
    };

  } catch (error: any) {
    console.error('Background check error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to initiate background check',
      }),
    };
  }
}; 