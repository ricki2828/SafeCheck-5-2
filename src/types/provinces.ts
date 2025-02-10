export interface PoliceStation {
  name: string;
  address: string;
  phone: string;
}

export interface ProvinceData {
  name: string;
  code: string;
  description: string;
  requirements: string[];
  processingTime: string;
  acceptedBy: string[];
  specialNotes?: string[];
  policeStations: PoliceStation[];
}

export type Provinces = {
  [key: string]: ProvinceData;
}

export const provinces: Record<string, ProvinceData> = {
  ontario: {
    name: 'Ontario',
    code: 'ON',
    description: 'Criminal record checks in Ontario are provided through local police services and the RCMP. Our service offers a faster alternative that is widely accepted by Ontario employers.',
    requirements: [
      'Valid government-issued photo ID',
      'Current residential address',
      'Previous addresses for the last 5 years',
      'Must be 18 years or older',
    ],
    processingTime: 'Results in as little as 15 minutes',
    acceptedBy: [
      'Ontario employers',
      'Volunteer organizations',
      'Educational institutions',
      'Healthcare facilities',
      'Financial institutions',
    ],
    specialNotes: [
      'Vulnerable Sector Checks must be processed through local police services',
      'Results are accepted by most Ontario employers and organizations',
    ],
    policeStations: [
      {
        name: 'Toronto Police Service',
        address: 'Toronto, Ontario',
        phone: '416-392-6400',
      },
      {
        name: 'Ottawa Police Service',
        address: 'Ottawa, Ontario',
        phone: '613-236-1222',
      },
    ],
  },
  british_columbia: {
    name: 'British Columbia',
    code: 'BC',
    description: 'Criminal record checks in BC are conducted through the Criminal Records Review Program (CRRP) and the RCMP. Our online service provides a fast and reliable alternative for employment screening.',
    requirements: [
      'Government-issued photo ID',
      'Current BC address',
      'Consent for criminal record check',
      'Employment or volunteer purpose declaration',
    ],
    processingTime: 'Results in as little as 15 minutes',
    acceptedBy: [
      'BC employers',
      'Professional licensing bodies',
      'Educational institutions',
      'Technology companies',
      'Hospitality sector',
    ],
    specialNotes: [
      'Criminal Record Review Act requires checks for working with children or vulnerable adults',
      'Some organizations may require the BC government\'s CRRP program specifically',
    ],
    policeStations: [
      {
        name: 'Vancouver Police Department',
        address: 'Vancouver, British Columbia',
        phone: '604-660-2222',
      },
      {
        name: 'Victoria Police Department',
        address: 'Victoria, British Columbia',
        phone: '250-387-6222',
      },
    ],
  },
  alberta: {
    name: 'Alberta',
    code: 'AB',
    description: 'Alberta criminal record checks are provided through local police services and the RCMP. Online checks are a convenient alternative for employment and volunteer screening.',
    requirements: [
      'Government-issued photo ID',
      'Proof of address',
      'Consent form',
      'Payment'
    ],
    processingTime: 'Results in as little as 15 minutes',
    acceptedBy: [
      'Alberta employers',
      'Oil and gas industry',
      'Construction companies',
      'Healthcare organizations',
      'Educational institutions',
    ],
    specialNotes: [
      'Vulnerable Sector Checks require in-person visits to police services',
      'Some positions in childcare require additional screening',
    ],
    policeStations: [
      {
        name: 'Calgary Police Service',
        address: 'Calgary, Alberta',
        phone: '403-266-1234',
      },
      {
        name: 'Edmonton Police Service',
        address: 'Edmonton, Alberta',
        phone: '780-423-3333',
      },
    ],
  },
  quebec: {
    name: 'Quebec',
    code: 'QC',
    description: 'Quebec criminal record checks are conducted through the RCMP and local police services. Our service provides fast results while maintaining compliance with Quebec privacy laws.',
    requirements: [
      'Valid Quebec government ID',
      'Current Quebec address',
      'Social Insurance Number (optional)',
      'Consent form in French and English',
    ],
    processingTime: 'Results in as little as 15 minutes',
    acceptedBy: [
      'Quebec employers',
      'Professional orders',
      'Service industry',
      'Manufacturing sector',
      'Transportation companies',
    ],
    specialNotes: [
      'All documentation available in French and English',
      'Some positions may require additional provincial security clearance',
      'Results provided in both official languages',
    ],
    policeStations: [
      {
        name: 'Service de police de la Ville de Montréal',
        address: 'Montréal, Québec',
        phone: '514-393-1930',
      },
      {
        name: 'Service de police de la Ville de Québec',
        address: 'Québec, Québec',
        phone: '418-648-2424',
      },
    ],
  },
  nova_scotia: {
    name: 'Nova Scotia',
    code: 'NS',
    description: 'Nova Scotia criminal record checks are available through local police services and the RCMP. Our online service provides a faster alternative for most employment purposes.',
    requirements: [
      'Valid NS identification',
      'Current Nova Scotia address',
      'Previous address history',
      'Purpose of criminal record check',
    ],
    processingTime: 'Results in as little as 15 minutes',
    acceptedBy: [
      'Nova Scotia employers',
      'Maritime industry',
      'Healthcare sector',
      'Educational institutions',
      'Government contractors',
    ],
    specialNotes: [
      'Vulnerable Sector Checks available through local police only',
      'Additional screening may be required for healthcare positions',
    ],
    policeStations: [
      {
        name: 'Halifax Regional Police',
        address: 'Halifax, Nova Scotia',
        phone: '902-490-5015',
      },
      {
        name: 'Cape Breton Regional Police',
        address: 'Sydney, Nova Scotia',
        phone: '902-562-5400',
      },
    ],
  },
  manitoba: {
    name: 'Manitoba',
    code: 'MB',
    description: 'Manitoba criminal record checks are provided through local police services and the RCMP. Our online service offers a convenient alternative for employment and volunteer screening.',
    requirements: [
      'Valid Manitoba photo ID',
      'Current Manitoba address',
      'Previous address history',
      'Declaration of purpose',
    ],
    processingTime: 'Results in as little as 15 minutes',
    acceptedBy: [
      'Manitoba employers',
      'Healthcare organizations',
      'Educational institutions',
      'Transportation industry',
      'Agricultural sector',
    ],
    specialNotes: [
      'Child Abuse Registry checks must be done separately',
      'Vulnerable Sector Checks require in-person verification',
    ],
    policeStations: [
      {
        name: 'Winnipeg Police Service',
        address: 'Winnipeg, Manitoba',
        phone: '204-986-6222',
      },
      {
        name: 'Brandon Police Service',
        address: 'Brandon, Manitoba',
        phone: '204-727-8666',
      },
    ],
  },
  saskatchewan: {
    name: 'Saskatchewan',
    code: 'SK',
    description: 'Saskatchewan criminal record checks are available through local police services and the RCMP. Our service provides quick results for employment and volunteer purposes.',
    requirements: [
      'Valid Saskatchewan ID',
      'Current SK address',
      'Employment/volunteer information',
      'Consent for record check',
    ],
    processingTime: 'Results in as little as 15 minutes',
    acceptedBy: [
      'Saskatchewan employers',
      'Mining industry',
      'Agricultural sector',
      'Healthcare facilities',
      'Educational institutions',
    ],
    specialNotes: [
      'Local police checks may be required for some positions',
      'Additional screening for working with vulnerable persons',
    ],
    policeStations: [
      {
        name: 'Regina Police Service',
        address: 'Regina, Saskatchewan',
        phone: '306-787-6222',
      },
      {
        name: 'Saskatoon Police Service',
        address: 'Saskatoon, Saskatchewan',
        phone: '306-933-3500',
      },
    ],
  },
  new_brunswick: {
    name: 'New Brunswick',
    code: 'NB',
    description: 'New Brunswick criminal record checks are conducted through local police services and the RCMP. Our online service provides efficient screening for most employment purposes.',
    requirements: [
      'Valid NB identification',
      'Current New Brunswick address',
      'Previous residential history',
      'Purpose declaration',
    ],
    processingTime: 'Results in as little as 15 minutes',
    acceptedBy: [
      'New Brunswick employers',
      'Government agencies',
      'Healthcare sector',
      'Educational institutions',
      'Financial services',
    ],
    specialNotes: [
      'Services available in both English and French',
      'Some employers may require local police checks',
    ],
    policeStations: [
      {
        name: 'Saint John Police Force',
        address: 'Saint John, New Brunswick',
        phone: '506-634-7425',
      },
      {
        name: 'Fredericton Police Force',
        address: 'Fredericton, New Brunswick',
        phone: '506-453-4500',
      },
    ],
  },
  prince_edward_island: {
    name: 'Prince Edward Island',
    code: 'PE',
    description: 'PEI criminal record checks are provided through local police services and the RCMP. Our service offers a faster alternative for most employment and volunteer purposes.',
    requirements: [
      'Valid PEI photo ID',
      'Current PEI address',
      'Previous address history',
      'Purpose of check',
    ],
    processingTime: 'Results in as little as 15 minutes',
    acceptedBy: [
      'PEI employers',
      'Tourism industry',
      'Agricultural sector',
      'Healthcare organizations',
      'Educational institutions',
    ],
    specialNotes: [
      'Some positions may require additional local checks',
      'Vulnerable Sector Checks available through police only',
    ],
    policeStations: [
      {
        name: 'Charlottetown Police Department',
        address: 'Charlottetown, Prince Edward Island',
        phone: '902-368-4444',
      },
      {
        name: 'Summerside Police Service',
        address: 'Summerside, Prince Edward Island',
        phone: '902-436-2222',
      },
    ],
  },
  newfoundland_and_labrador: {
    name: 'Newfoundland and Labrador',
    code: 'NL',
    description: 'Newfoundland and Labrador criminal record checks are available through the Royal Newfoundland Constabulary and RCMP. Our service provides quick results for most purposes.',
    requirements: [
      'Valid NL identification',
      'Current NL address',
      'Previous address history',
      'Purpose declaration',
    ],
    processingTime: 'Results in as little as 15 minutes',
    acceptedBy: [
      'NL employers',
      'Maritime industry',
      'Oil and gas sector',
      'Healthcare facilities',
      'Educational institutions',
    ],
    specialNotes: [
      'RNC jurisdiction requires separate checks',
      'Some remote areas may require RCMP verification',
    ],
    policeStations: [
      {
        name: 'Royal Newfoundland Constabulary',
        address: 'St. John\'s, Newfoundland and Labrador',
        phone: '709-729-2222',
      },
      {
        name: 'RCMP NL',
        address: 'St. John\'s, Newfoundland and Labrador',
        phone: '709-729-2222',
      },
    ],
  },
  yukon: {
    name: 'Yukon',
    code: 'YT',
    description: 'Yukon criminal record checks are conducted through RCMP and territorial services. Our online service provides efficient screening for most purposes.',
    requirements: [
      'Valid Yukon ID',
      'Current Yukon address',
      'Previous address history',
      'Purpose of check',
    ],
    processingTime: 'Results in as little as 15 minutes',
    acceptedBy: [
      'Yukon employers',
      'Mining industry',
      'Tourism sector',
      'Government contractors',
      'Educational institutions',
    ],
    specialNotes: [
      'Remote locations may require additional verification',
      'Some positions require territorial security screening',
    ],
    policeStations: [
      {
        name: 'RCMP Yukon',
        address: 'Whitehorse, Yukon',
        phone: '867-667-4000',
      },
    ],
  },
  northwest_territories: {
    name: 'Northwest Territories',
    code: 'NT',
    description: 'Northwest Territories criminal record checks are provided through RCMP services. Our online service offers convenient screening for most employment purposes.',
    requirements: [
      'Valid NT identification',
      'Current NT address',
      'Previous address history',
      'Purpose declaration',
    ],
    processingTime: 'Results in as little as 15 minutes',
    acceptedBy: [
      'NT employers',
      'Mining companies',
      'Government agencies',
      'Educational institutions',
      'Healthcare facilities',
    ],
    specialNotes: [
      'Remote communities may require additional verification',
      'Some positions require territorial security clearance',
    ],
    policeStations: [
      {
        name: 'RCMP NT',
        address: 'Yellowknife, Northwest Territories',
        phone: '867-667-4000',
      },
    ],
  },
  nunavut: {
    name: 'Nunavut',
    code: 'NU',
    description: 'Nunavut criminal record checks are conducted through RCMP services. Our online service provides efficient screening while respecting territorial requirements.',
    requirements: [
      'Valid Nunavut ID',
      'Current Nunavut address',
      'Previous address history',
      'Purpose of check',
    ],
    processingTime: 'Results in as little as 15 minutes',
    acceptedBy: [
      'Nunavut employers',
      'Mining industry',
      'Government agencies',
      'Educational institutions',
      'Healthcare organizations',
    ],
    specialNotes: [
      'Services available in Inuktitut upon request',
      'Remote locations may require additional verification',
      'Some positions require territorial security screening',
    ],
    policeStations: [
      {
        name: 'RCMP Nunavut',
        address: 'Iqaluit, Nunavut',
        phone: '867-975-6500',
      },
    ],
  },
}; 