import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

interface BlogPost {
  title: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}

interface BlogPosts {
  [key: number]: BlogPost;
}

// This would typically come from an API or CMS
const blogPosts: BlogPosts = {
  1: {
    title: 'Understanding Criminal Record Checks in Canada: A Complete Guide',
    content: `
      <h2>Introduction</h2>
      <p>Criminal record checks are an essential part of many employment processes in Canada. This comprehensive guide will help you understand what they are, how they work, and why they're important.</p>

      <h2>What is a Criminal Record Check?</h2>
      <p>A criminal record check, also known as a police check or background check, is a search of the National Repository of Criminal Records. This search reveals any criminal convictions, pending charges, and court orders registered in the database.</p>

      <h2>Types of Criminal Record Checks</h2>
      <ul>
        <li>Basic Criminal Record Check</li>
        <li>Enhanced Criminal Record Check</li>
        <li>Vulnerable Sector Check</li>
      </ul>

      <h2>Processing Times</h2>
      <p>With modern digital systems, most basic criminal record checks can be completed within 15 minutes. However, if there's a potential match that requires further verification, the process might take 24-48 hours.</p>
    `,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'March 15, 2024',
    readTime: '8',
    author: {
      name: 'Sarah Johnson',
      role: 'Legal Compliance Specialist',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    }
  },
  2: {
    title: 'Top 5 Reasons Employers Require Background Checks',
    content: `
      <h2>Introduction</h2>
      <p>In today's business environment, employers are increasingly relying on background checks as part of their hiring process. Here are the top reasons why.</p>

      <h2>1. Workplace Safety</h2>
      <p>Ensuring a safe workplace is a top priority for employers. Background checks help identify potential risks and protect employees, customers, and company assets.</p>

      <h2>2. Regulatory Compliance</h2>
      <p>Many industries have specific regulations requiring background checks for certain positions. Compliance is not optional - it's a legal requirement.</p>

      <h2>3. Reducing Liability</h2>
      <p>Companies can be held liable for negligent hiring if they fail to take reasonable precautions in screening employees. Background checks help mitigate this risk.</p>

      <h2>4. Protecting Company Assets</h2>
      <p>Background checks help verify a candidate's history of handling sensitive information and financial responsibilities, protecting company assets, intellectual property, and confidential data.</p>

      <h2>5. Verifying Qualifications</h2>
      <p>Criminal record checks, as part of a comprehensive background screening process, help verify a candidate's honesty and integrity, ensuring they meet the qualifications and trustworthiness required for the position.</p>
    `,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'March 12, 2024',
    readTime: '6',
    author: {
      name: 'Michael Chen',
      role: 'HR Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    }
  }
};

export default function BlogPost() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPosts[Number(id)] : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-dark/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{t('blog.backToBlog')}</span>
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
              <span>{t('blog.publishedOn', { date: post.date })}</span>
              <span>•</span>
              <span>{t('blog.readTime', { time: post.readTime })}</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}