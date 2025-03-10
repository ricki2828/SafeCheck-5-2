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
    
    // Check for API key at the start
    if (!process.env.CERTN_API_KEY) {
      console.error('CERTN_API_KEY environment variable is not set');
      throw new Error('Missing required CERTN_API_KEY environment variable');
    }

    const authHeader = `Token ${process.env.CERTN_API_KEY}`;

    // Hardcode the package ID for Canadian criminal checks
    const CANADIAN_CRIMINAL_CHECK_PACKAGE_ID = "2b1e6443-35e4-408a-98b8-d6db7e5ad9c5";

    const requestBody = {
      package: CANADIAN_CRIMINAL_CHECK_PACKAGE_ID,
      email_address: data.email
    };

    // Update the logging to show exactly what we're sending
    console.info('Sending to Certn:', {
      url: 'https://api.sandbox.certn.co/api/public/cases/order-package/',
      headers: {
        Authorization: 'Api-Key [REDACTED]',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: requestBody
    });

    const certnResponse = await fetch('https://api.sandbox.certn.co/api/public/cases/order-package/', {
      method: 'POST',
      headers: {
        Authorization: `Api-Key ${process.env.CERTN_API_KEY}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
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