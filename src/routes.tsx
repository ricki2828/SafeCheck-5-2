import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Blog from './pages/blog/Blog';
import BlogPost from './pages/blog/BlogPost';
import ProvincePage from './pages/provinces/ProvincePage';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/blog',
    element: <Blog />,
  },
  {
    path: '/blog/:slug',
    element: <BlogPost />,
  },
  {
    path: '/blog/:province',
    element: <Blog />,
  },
  {
    path: '/provinces/:province',
    element: <ProvincePage />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
  {
    path: '/terms',
    element: <Terms />,
  }
]); 