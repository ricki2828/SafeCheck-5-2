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
        // Create the case with the Canadian Criminal Check package
        const certnResponse = await (0, node_fetch_1.default)('https://api.sandbox.certn.co/api/v3/cases/', {
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
                package_type: 'canadian_criminal_check', // Specify the package type
                consent: true, // Assuming consent was given during the form process
                send_email: true, // Request email delivery of the report
                email_language: 'en', // Set email language to English
                webhook_url: process.env.SITE_URL + '/.netlify/functions/certn-webhook', // Optional: for status updates
            }),
        });
        if (!certnResponse.ok) {
            const errorData = await certnResponse.json();
            console.error('Certn API error details:', errorData);
            throw new Error(`Certn API error: ${JSON.stringify(errorData)}`);
        }
        const result = await certnResponse.json();
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
    }
    catch (error) {
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
exports.handler = handler;
