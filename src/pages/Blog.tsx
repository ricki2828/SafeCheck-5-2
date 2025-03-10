import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Criminal Record Checks in Canada: A Complete Guide',
    excerpt: 'Learn everything you need to know about criminal record checks in Canada, including types, requirements, and processing times.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'March 15, 2024',
    readTime: '8'
  },
  {
    id: 2,
    title: 'Top 5 Reasons Employers Require Background Checks',
    excerpt: 'Discover why Canadian employers increasingly rely on criminal record checks for their hiring process.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'March 12, 2024',
    readTime: '6'
  },
  {
    id: 3,
    title: "Digital vs. Traditional Background Checks: What's the Difference?",
    excerpt: 'Compare modern digital background checks with traditional methods and see why online verification is the future.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'March 10, 2024',
    readTime: '5'
  },
  {
    id: 4,
    title: 'Privacy and Security in Background Checks: What You Need to Know',
    excerpt: 'Understanding how your information is protected during the background check process.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'March 8, 2024',
    readTime: '7'
  }
];

export default function Blog() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-dark/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{t('blog.backToHome')}</span>
          </Link>

          <div className="mt-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">{t('blog.title')}</h1>
            <p className="text-xl text-white/80">
              {t('blog.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map(post => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{t('blog.readTime', { time: post.readTime })}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80"
                >
                  <span>{t('blog.readMore')}</span>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}