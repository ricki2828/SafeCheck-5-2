const createCertnCase = async (packageId: string, email: string) => {
    try {
      const response = await fetch('https://api.sandbox.certn.co/api/v3/cases/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.VITE_CERTN_API_KEY}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          package: packageId,
          email: email,
          webhook_url: 'https://silly-maamoul-9fe780.netlify.app/.netlify/functions/certn-webhook'
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const caseData = await response.json();
      console.log('Created Certn Case:');
      console.log(JSON.stringify(caseData, null, 2));
      return caseData;
    } catch (error) {
      console.error('Error creating case:', error);
      throw error;
    }
  };
  
  // Example usage:
  // createCertnCase('package_id_here', 'test@example.com'); 