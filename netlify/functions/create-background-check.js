"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
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
            throw new Error('Request body is empty');
        }
        const data = JSON.parse(event.body);
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
        const certnResponse = await (0, node_fetch_1.default)('https://api.sandbox.certn.co/api/public/cases/order-package/', {
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
        const result = (await certnResponse.json());
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
    }
    catch (error) {
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
exports.handler = handler;
