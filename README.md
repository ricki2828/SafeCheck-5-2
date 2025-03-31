# SafeHire - Criminal Record Check Service

A modern, fast, and secure criminal record check service for Canadian employers and individuals.

## Features

- Fast criminal record checks (results in 15 minutes)
- RCMP verified results
- Secure digital delivery
- Multi-language support (English/French)
- Stripe payment integration
- Bulk purchase options for employers

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CERTN_API_KEY=...
SITE_URL=http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Stripe Payments
- i18next
- Jest
- Netlify Functions

## License

MIT