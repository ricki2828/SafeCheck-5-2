import axios from 'axios';

const CERTN_API_BASE = import.meta.env.PROD 
  ? 'https://api.certn.co/api/public'
  : 'https://api.sandbox.certn.co/api/public';

// Types based on the API response
export type PermissiblePurpose = 'LENDING' | 'CONSUMER' | 'TENANCY' | 'INVESTING' | 'EMPLOYMENT' | 'INSURANCE';

export interface CheckArguments {
  ordering_type?: 'EXPLICIT_ORDERING';
  explicit_check_type?: string[];
  [key: string]: any;
}

export interface PackageCheck {
  check_type: string;
  arguments: CheckArguments;
}

export interface CertnPackage {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  permissible_purposes: PermissiblePurpose[];
  created_by: string;
  checks: PackageCheck[];
  tags: string[];
  bundles: any[];
}

export interface CertnOrder {
  package: string;  // Package ID
  email_address: string;  // Changed from email to email_address
  first_name?: string;    // Made optional since it worked without it
  last_name?: string;     // Made optional since it worked without it
  phone?: string;
  permissible_purpose?: PermissiblePurpose;  // Made optional since it worked without it
}

// ... rest of your existing code ...

export const certnService = {
  async getPackages() {
    const response = await certnApi.get<CertnResponse<CertnPackage>>('/packages/');
    return response.data;
  },

  async createOrder(orderData: {
    package_id: string;
    email_address: string;  // Changed from email to email_address
    first_name?: string;    // Made optional
    last_name?: string;     // Made optional
    phone?: string;
    permissible_purpose?: PermissiblePurpose;  // Made optional
  }) {
    const response = await certnApi.post<CertnOrder>('/orders/', {
      package: orderData.package_id,
      email_address: orderData.email_address  // Changed from email to email_address
    });
    return response.data;
  }
};

export default certnService; 