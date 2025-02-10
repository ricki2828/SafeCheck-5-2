export interface UseCase {
    id: string;
    title: string;
    description: string;
    requirements: string[];
    turnaroundTime: string;
    acceptedBy: string[];
    additionalInfo: string[];
    commonQuestions: {
      question: string;
      answer: string;
    }[];
    price: number;
  }
  
  export const useCases: Record<string, UseCase> = {
    employment: {
      id: 'employment',
      title: 'Employment Criminal Record Check',
      description: 'Standard criminal record check for employment purposes, accepted by most Canadian employers.',
      requirements: [
        'Government-issued photo ID',
        'Current residential address',
        'Previous addresses (last 5 years)',
        'Employer details (optional)',
      ],
      turnaroundTime: '15 minutes to 24 hours',
      acceptedBy: [
        'Private sector employers',
        'Government agencies',
        'Financial institutions',
        'Technology companies',
        'Professional services firms',
      ],
      additionalInfo: [
        'Results delivered securely via email',
        'PDF certificate ready for sharing with employers',
        'Valid across Canada',
        'Includes basic criminal record search',
      ],
      commonQuestions: [
        {
          question: 'Will my employer accept this check?',
          answer: 'Yes, our criminal record checks are accepted by most Canadian employers. We use the same RCMP database used by police services.',
        },
        {
          question: 'How long is the check valid for?',
          answer: 'Most employers accept criminal record checks that are less than 6 months old, though some may require more recent results.',
        },
        {
          question: 'What shows up on the check?',
          answer: 'The check reveals criminal convictions that have not been pardoned. It does not include non-conviction information or pending charges.',
        },
      ],
      price: 65,
    },
    volunteering: {
      id: 'volunteering',
      title: 'Volunteer Criminal Record Check',
      description: 'Basic criminal record check suitable for volunteer positions that don\'t involve working with vulnerable persons.',
      requirements: [
        'Government-issued photo ID',
        'Current residential address',
        'Volunteer organization details',
        'Letter of request (if available)',
      ],
      turnaroundTime: '15 minutes to 24 hours',
      acceptedBy: [
        'Community organizations',
        'Sports clubs',
        'Religious institutions',
        'Cultural organizations',
        'Educational programs',
      ],
      additionalInfo: [
        'Reduced rate for volunteer purposes',
        'Digital delivery of results',
        'Valid across Canada',
        'Includes basic criminal record search',
      ],
      commonQuestions: [
        {
          question: 'Is this suitable for all volunteer positions?',
          answer: 'This check is suitable for basic volunteer positions. Positions working with vulnerable persons require a Vulnerable Sector Check, which must be obtained through local police.',
        },
        {
          question: 'Do I need a letter from the organization?',
          answer: 'While helpful, a letter is not required for our basic volunteer check. However, some organizations may require specific documentation.',
        },
      ],
      price: 45,
    },
    teaching: {
      id: 'teaching',
      title: 'Education Sector Criminal Record Check',
      description: 'Comprehensive criminal record check designed for education professionals and support staff.',
      requirements: [
        'Government-issued photo ID',
        'Current residential address',
        'Teaching license number (if applicable)',
        'Educational institution details',
      ],
      turnaroundTime: '15 minutes to 24 hours',
      acceptedBy: [
        'Public schools',
        'Private schools',
        'Post-secondary institutions',
        'Language schools',
        'Training organizations',
      ],
      additionalInfo: [
        'Note: May need supplementary Vulnerable Sector Check',
        'Accepted by most educational institutions',
        'Digital and printable results',
        'Province-specific requirements noted',
      ],
      commonQuestions: [
        {
          question: 'Is this sufficient for teaching positions?',
          answer: 'While this check meets basic requirements, many teaching positions also require a Vulnerable Sector Check, which must be obtained through local police.',
        },
        {
          question: 'How often do I need to renew?',
          answer: 'Most educational institutions require annual or bi-annual updates. Check with your specific institution for their requirements.',
        },
      ],
      price: 65,
    },
    healthcare: {
      id: 'healthcare',
      title: 'Healthcare Criminal Record Check',
      description: 'Criminal record check tailored for healthcare professionals and support staff positions.',
      requirements: [
        'Government-issued photo ID',
        'Current residential address',
        'Professional license number (if applicable)',
        'Healthcare facility details',
      ],
      turnaroundTime: '15 minutes to 24 hours',
      acceptedBy: [
        'Hospitals',
        'Medical clinics',
        'Long-term care facilities',
        'Pharmacies',
        'Healthcare agencies',
      ],
      additionalInfo: [
        'Note: May need supplementary Vulnerable Sector Check',
        'Accepted by most healthcare employers',
        'Includes professional license verification',
        'Province-specific requirements noted',
      ],
      commonQuestions: [
        {
          question: 'Is this sufficient for all healthcare positions?',
          answer: 'While this meets basic requirements, positions with direct patient care may also require a Vulnerable Sector Check through local police.',
        },
        {
          question: 'How quickly can I start work?',
          answer: 'With our rapid results (15 minutes to 24 hours), you can often start work as soon as your employer reviews and accepts the results.',
        },
      ],
      price: 65,
    },
    transportation: {
      id: 'transportation',
      title: 'Transportation Sector Check',
      description: 'Specialized criminal record check for transportation and logistics professionals, including drivers and operators.',
      requirements: [
        'Government-issued photo ID',
        'Driver\'s license number',
        'Current residential address',
        'Employment history (5 years)',
      ],
      turnaroundTime: '15 minutes to 24 hours',
      acceptedBy: [
        'Trucking companies',
        'Courier services',
        'Public transit authorities',
        'Logistics companies',
        'Ride-sharing services',
      ],
      additionalInfo: [
        'Complements driver abstract requirements',
        'Suitable for commercial driver positions',
        'Digital delivery of results',
        'Accepted across provincial borders',
      ],
      commonQuestions: [
        {
          question: 'Is this sufficient for commercial driving positions?',
          answer: 'Yes, this check meets standard requirements for most commercial driving positions. However, some employers may require additional screening such as driver abstracts or drug testing.',
        },
        {
          question: 'Does this include driving record information?',
          answer: 'No, this is specifically a criminal record check. A separate driver abstract must be obtained from your provincial ministry of transportation.',
        },
      ],
      price: 65,
    },
    financial: {
      id: 'financial',
      title: 'Financial Sector Check',
      description: 'Enhanced criminal record check designed for financial services professionals and banking staff.',
      requirements: [
        'Government-issued photo ID',
        'Current residential address',
        'Previous addresses (7 years)',
        'Professional certifications',
      ],
      turnaroundTime: '15 minutes to 24 hours',
      acceptedBy: [
        'Banks and credit unions',
        'Investment firms',
        'Insurance companies',
        'Financial advisors',
        'Accounting firms',
      ],
      additionalInfo: [
        'Meets financial sector compliance requirements',
        'Includes fraud check verification',
        'Suitable for IIROC requirements',
        'Digital certificate provided',
      ],
      commonQuestions: [
        {
          question: 'Is this suitable for IIROC registration?',
          answer: 'This check meets basic requirements, but IIROC registration may require additional checks and certifications.',
        },
        {
          question: 'Does this include credit checks?',
          answer: 'No, this is a criminal record check only. Credit checks must be obtained separately through credit bureaus.',
        },
      ],
      price: 65,
    },
    childcare: {
      id: 'childcare',
      title: 'Childcare Provider Check',
      description: 'Basic criminal record check for childcare providers, noting that a Vulnerable Sector Check may also be required.',
      requirements: [
        'Government-issued photo ID',
        'Current residential address',
        'Previous addresses (5 years)',
        'Childcare employer details',
      ],
      turnaroundTime: '15 minutes to 24 hours',
      acceptedBy: [
        'Private daycare centers',
        'After-school programs',
        'Recreation programs',
        'Summer camps',
        'Private childcare arrangements',
      ],
      additionalInfo: [
        'Note: Vulnerable Sector Check required for licensed facilities',
        'Meets basic screening requirements',
        'Provincial regulations may vary',
        'Quick results for preliminary screening',
      ],
      commonQuestions: [
        {
          question: 'Is this enough for working with children?',
          answer: 'While this provides basic screening, most childcare positions require a Vulnerable Sector Check, which must be obtained through local police services.',
        },
        {
          question: 'How often should I renew my check?',
          answer: 'Most childcare organizations require annual renewal of criminal record checks. Check your local regulations and employer requirements.',
        },
      ],
      price: 65,
    },
    construction: {
      id: 'construction',
      title: 'Construction Industry Check',
      description: 'Criminal record check tailored for construction and trades professionals working on commercial and residential projects.',
      requirements: [
        'Government-issued photo ID',
        'Current residential address',
        'Trade license information',
        'Employer details',
      ],
      turnaroundTime: '15 minutes to 24 hours',
      acceptedBy: [
        'Construction companies',
        'General contractors',
        'Property developers',
        'Trade unions',
        'Government projects',
      ],
      additionalInfo: [
        'Suitable for site access requirements',
        'Meets general contractor standards',
        'Valid across provinces',
        'Digital results available immediately',
      ],
      commonQuestions: [
        {
          question: 'Is this accepted for government construction projects?',
          answer: 'Yes, this check meets standard requirements for most government construction projects, though some may require additional security clearance.',
        },
        {
          question: 'Does this include safety certifications?',
          answer: 'No, this is specifically a criminal record check. Safety certifications and training must be obtained separately.',
        },
      ],
      price: 65,
    },
    retail: {
      id: 'retail',
      title: 'Retail Sector Check',
      description: 'Criminal record check designed for retail employees, managers, and loss prevention staff.',
      requirements: [
        'Government-issued photo ID',
        'Current residential address',
        'Previous employment history',
        'Retail employer information',
      ],
      turnaroundTime: '15 minutes to 24 hours',
      acceptedBy: [
        'Retail chains',
        'Department stores',
        'Shopping centers',
        'Luxury retailers',
        'Loss prevention agencies',
      ],
      additionalInfo: [
        'Suitable for all retail positions',
        'Includes basic criminal record verification',
        'Fast results for quick hiring',
        'Digital certificate provided',
      ],
      commonQuestions: [
        {
          question: 'Is this suitable for loss prevention positions?',
          answer: 'Yes, this check meets standard requirements for most retail and loss prevention positions.',
        },
        {
          question: 'How quickly can I start work?',
          answer: 'With our rapid results (15 minutes to 24 hours), you can typically start work as soon as your employer reviews and accepts the results.',
        },
      ],
      price: 65,
    }
  }; 