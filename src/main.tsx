import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BulkChecks from './pages/BulkChecks';
import IndividualConfirmation from './pages/IndividualConfirmation';
import BulkConfirmation from './pages/BulkConfirmation';
import ScrollToTop from './components/ScrollToTop';
import './i18n/config';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <App />
      </>
    ),
  },
  {
    path: '/terms',
    element: (
      <>
        <ScrollToTop />
        <Terms />
      </>
    ),
  },
  {
    path: '/privacy',
    element: (
      <>
        <ScrollToTop />
        <Privacy />
      </>
    ),
  },
  {
    path: '/blog',
    element: (
      <>
        <ScrollToTop />
        <Blog />
      </>
    ),
  },
  {
    path: '/blog/:id',
    element: (
      <>
        <ScrollToTop />
        <BlogPost />
      </>
    ),
  },
  {
    path: '/bulk-checks',
    element: (
      <>
        <ScrollToTop />
        <BulkChecks />
      </>
    ),
  },
  {
    path: '/success/individual',
    element: (
      <>
        <ScrollToTop />
        <IndividualConfirmation />
      </>
    ),
  },
  {
    path: '/success/bulk',
    element: (
      <>
        <ScrollToTop />
        <BulkConfirmation />
      </>
    ),
  },
]);

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const helmetContext = {};

createRoot(container).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>
);