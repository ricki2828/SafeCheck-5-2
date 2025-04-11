import React, { useEffect } from 'react';
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
    date: 'April 7, 2025',
    readTime: '5',
    author: {
      name: 'Agostinho Pedro',
      role: '',
      image: ''
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
    date: 'March 31, 2025',
    readTime: '4',
    author: {
      name: 'Agostinho Pedro',
      role: '',
      image: ''
    }
  },
  3: {
    title: 'Digital vs. Traditional Background Checks: What\'s the Difference?',
    content: `
      <h2>Introduction</h2>
      <p>As technology continues to transform the hiring process, background checks have evolved from paper-based systems to digital platforms. Understanding the differences between these approaches can help employers and job seekers make informed decisions.</p>

      <h2>Traditional Background Checks</h2>
      <p>Traditional background checks typically involve manual processes where candidates must visit police stations or government offices in person to request their records. These checks often require:</p>
      <ul>
        <li>In-person visits to police stations or government offices</li>
        <li>Physical fingerprinting</li>
        <li>Paper forms that must be mailed or submitted in person</li>
        <li>Extended processing times, often 5-10 business days</li>
        <li>Physical copies of results that must be mailed or picked up</li>
      </ul>

      <h2>Digital Background Checks</h2>
      <p>Digital background checks leverage technology to streamline the process, offering several advantages:</p>
      <ul>
        <li>Online submission of personal information</li>
        <li>Digital identity verification</li>
        <li>Automated database searches</li>
        <li>Faster processing times, often within minutes or hours</li>
        <li>Secure digital delivery of results</li>
      </ul>

      <h2>Key Differences</h2>
      <p>The primary differences between digital and traditional background checks include:</p>
      <ul>
        <li><strong>Convenience:</strong> Digital checks can be completed from anywhere with internet access, while traditional checks require physical presence.</li>
        <li><strong>Speed:</strong> Digital checks typically process much faster than traditional methods.</li>
        <li><strong>Accuracy:</strong> Both methods can be accurate, but digital systems often have built-in verification steps to reduce errors.</li>
        <li><strong>Cost:</strong> Digital checks often cost less due to reduced administrative overhead.</li>
        <li><strong>Comprehensiveness:</strong> Traditional checks may access some databases that digital systems cannot yet access.</li>
      </ul>

      <h2>Which Method is Right for You?</h2>
      <p>The choice between digital and traditional background checks depends on several factors:</p>
      <ul>
        <li>Urgency of the check</li>
        <li>Specific requirements of the position</li>
        <li>Regulatory compliance needs</li>
        <li>Budget considerations</li>
        <li>Geographic location of the candidate</li>
      </ul>

      <h2>Conclusion</h2>
      <p>While traditional background checks still have their place, digital methods are increasingly becoming the preferred option for their speed, convenience, and cost-effectiveness. As technology continues to advance, we can expect digital background checks to become even more comprehensive and reliable.</p>
    `,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'March 24, 2025',
    readTime: '6',
    author: {
      name: 'Agostinho Pedro',
      role: '',
      image: ''
    }
  },
  4: {
    title: 'Privacy and Security in Background Checks: What You Need to Know',
    content: `
      <h2>Introduction</h2>
      <p>Background checks involve the collection and processing of sensitive personal information, making privacy and security paramount concerns. This article explores the key privacy and security considerations for both employers and job candidates.</p>

      <h2>Legal Framework for Privacy in Background Checks</h2>
      <p>In Canada, background checks are governed by various privacy laws and regulations:</p>
      <ul>
        <li>The Personal Information Protection and Electronic Documents Act (PIPEDA)</li>
        <li>Provincial privacy legislation (in provinces with substantially similar legislation)</li>
        <li>Industry-specific regulations for sectors like healthcare and finance</li>
      </ul>
      <p>These laws establish requirements for collecting, using, and protecting personal information during the background check process.</p>

      <h2>Key Privacy Principles</h2>
      <p>When conducting background checks, organizations must adhere to these fundamental privacy principles:</p>
      <ul>
        <li><strong>Consent:</strong> Candidates must provide explicit consent before a background check can be conducted.</li>
        <li><strong>Purpose Limitation:</strong> Information collected should only be used for the specific purpose stated.</li>
        <li><strong>Data Minimization:</strong> Only necessary information should be collected.</li>
        <li><strong>Accuracy:</strong> Reasonable steps must be taken to ensure information is accurate and up-to-date.</li>
        <li><strong>Access and Correction:</strong> Candidates have the right to access their information and request corrections.</li>
        <li><strong>Safeguards:</strong> Appropriate security measures must protect personal information.</li>
      </ul>

      <h2>Security Measures for Protecting Background Check Data</h2>
      <p>Organizations should implement robust security measures to protect sensitive information:</p>
      <ul>
        <li><strong>Encryption:</strong> Data should be encrypted both in transit and at rest.</li>
        <li><strong>Access Controls:</strong> Strict access controls limit who can view background check results.</li>
        <li><strong>Secure Storage:</strong> Information should be stored in secure systems with appropriate backup procedures.</li>
        <li><strong>Data Retention Policies:</strong> Clear policies should govern how long information is retained.</li>
        <li><strong>Regular Audits:</strong> Security practices should be regularly reviewed and updated.</li>
      </ul>

      <h2>Common Privacy and Security Concerns</h2>
      <p>Several issues frequently arise regarding privacy and security in background checks:</p>
      <ul>
        <li><strong>Data Breaches:</strong> The risk of unauthorized access to sensitive information.</li>
        <li><strong>Third-Party Vendors:</strong> Ensuring that background check providers maintain adequate security standards.</li>
        <li><strong>International Transfers:</strong> Challenges when data crosses national borders.</li>
        <li><strong>Incorrect Information:</strong> The impact of errors in background check results.</li>
        <li><strong>Excessive Information:</strong> Collecting more data than necessary for the position.</li>
      </ul>

      <h2>Best Practices for Employers</h2>
      <p>Employers can take several steps to ensure privacy and security in their background check processes:</p>
      <ul>
        <li>Develop clear policies governing background checks</li>
        <li>Provide candidates with detailed information about the process</li>
        <li>Obtain explicit consent before conducting checks</li>
        <li>Use reputable background check providers with strong security practices</li>
        <li>Limit access to background check results within the organization</li>
        <li>Implement secure document disposal procedures</li>
        <li>Train staff on privacy and security best practices</li>
      </ul>

      <h2>Rights and Responsibilities of Job Candidates</h2>
      <p>Candidates also have important rights and responsibilities regarding their personal information:</p>
      <ul>
        <li>The right to know what information is being collected and why</li>
        <li>The right to access their background check results</li>
        <li>The right to dispute inaccurate information</li>
        <li>The responsibility to provide accurate information</li>
        <li>The responsibility to understand the scope of the background check</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Privacy and security are fundamental to maintaining trust in the background check process. By adhering to legal requirements, implementing strong security measures, and following best practices, organizations can protect sensitive information while still making informed hiring decisions.</p>
    `,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'March 17, 2025',
    readTime: '7',
    author: {
      name: 'Agostinho Pedro',
      role: '',
      image: ''
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
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <span>{post.date}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="text-sm text-gray-500 mb-8">
              by Agostinho Pedro, Operations Specialist
            </div>
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