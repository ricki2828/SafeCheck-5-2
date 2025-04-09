// Google Ads Conversion Tracking Configuration

/*
To properly set up Google Ads conversion tracking:

1. Replace the placeholders in the code with your actual Google Ads account information:
   - Replace AW-CONVERSION_ID with your actual Google Ads account ID (e.g., AW-123456789)
   - Replace CONVERSION_LABEL with your actual conversion label (e.g., AbCdEfGh12)

2. Make sure your Google Tag implementation is properly loaded on every page

3. Check for any console errors in your browser's developer tools

4. Use Google Tag Assistant to verify the implementation:
   https://tagassistant.google.com/

5. Set up a test conversion to verify the tracking is working
*/

// Example implementation for index.html
/*
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ZM4CCJNX5L"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ZM4CCJNX5L');
  gtag('config', 'AW-CONVERSION_ID'); // Replace with your Google Ads ID
</script>
*/

// Example implementation for conversion pages
/*
useEffect(() => {
  // Google Analytics 4 purchase event tracking
  window.gtag('event', 'purchase', {
    transaction_id: new URLSearchParams(window.location.search).get('transaction_id') || 'unknown',
    value: 65.00,
    currency: 'CAD',
    items: [{
      item_name: 'Individual Background Check',
      price: 65.00,
      quantity: 1
    }]
  });

  // Google Ads conversion tracking
  window.gtag('event', 'conversion', {
    'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with your actual values
    'value': 65.00,
    'currency': 'CAD',
    'transaction_id': new URLSearchParams(window.location.search).get('transaction_id') || 'unknown'
  });
}
*/ 