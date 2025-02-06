import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const fetchCertnPackages = async () => {
  try {
    console.log('Starting request...');
    console.log('Using API key:', process.env.VITE_CERTN_API_KEY?.substring(0, 5) + '...');
    
    const response = await axios.get('https://api.certn.co/api/public/cases/', {  // Changed to production URL
      headers: {
        'Authorization': `Api-Key ${process.env.VITE_CERTN_API_KEY}`,
        'Accept': 'application/json'
      },
      timeout: 5000, // 5 second timeout
      httpsAgent: new (require('https').Agent)({  
        rejectUnauthorized: false, // Note: This is not recommended for production
        secureProtocol: 'TLSv1_2_method'
      })
    });

    console.log('Available Certn Cases:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('API Key exists:', !!process.env.VITE_CERTN_API_KEY);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        code: error.code,
        isAxiosError: true
      });
    } else {
      console.error('Error fetching packages:', error);
    }
    process.exit(1); // Force exit on error
  }
};

console.log('Script starting...');
fetchCertnPackages().catch(error => {
  console.error('Top level error:', error);
  process.exit(1);
}); 