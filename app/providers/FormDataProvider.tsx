// app/providers/FormDataProvider.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our form data
export type FormData = {
  // Page 1: Passport & Personal Information
  passport: {
    number: string;
    issuingAuthority: string;
    dateOfIssue: string;
    dateOfExpiry: string;
  };
  nationalId: {
    number: string;
    issuingAuthority: string;
    dateOfIssue: string;
    dateOfExpiry: string;
  };
  personalInfo: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    gender: 'Male' | 'Female' | 'Other';
    placeOfBirth: string;
    hasNameChanged: boolean;
  };
  
  // Page 2: Marital Status & Family
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | '';
  spouse?: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    travelingWithYou: boolean;
  };
  children: Array<{
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    relationship: string;
    travelingWithYou: boolean;
  }>;
  
  // Page 3: Address History
  currentAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    yearsAtAddress: number;
    monthsAtAddress: number;
  };
  previousAddresses: Array<{
    id: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    fromDate: string;
    toDate: string;
    reasonForLeaving: string;
  }>;
  
  // Page 4: Financial Details
  employmentStatus: 'Employed' | 'Self-employed' | 'Student' | 'Retired' | 'Unemployed' | '';
  employment?: {
    companyName: string;
    jobTitle: string;
    startDate: string;
    salary: string;
    employerAddress: string;
    employerPhone: string;
  };
  selfEmployment?: {
    businessName: string;
    businessType: string;
    annualIncome: string;
    startDate: string;
  };
  education?: {
    institutionName: string;
    course: string;
    startDate: string;
    endDate: string;
    isFullTime: boolean;
  };
  tripSponsor: 'Self' | 'Employer' | 'Family' | 'Other' | '';
  sponsorDetails?: {
    name: string;
    relationship: string;
    contactInfo: string;
  };
};

// Initial/default form data
const initialFormData: FormData = {
  passport: { number: '', issuingAuthority: '', dateOfIssue: '', dateOfExpiry: '' },
  nationalId: { number: '', issuingAuthority: '', dateOfIssue: '', dateOfExpiry: '' },
  personalInfo: {
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    gender: 'Male',
    placeOfBirth: '',
    hasNameChanged: false
  },
  maritalStatus: '',
  children: [],
  currentAddress: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    yearsAtAddress: 0,
    monthsAtAddress: 0
  },
  previousAddresses: [],
  employmentStatus: '',
  tripSponsor: ''
};

// Create context
type FormContextType = {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
  updateNestedFormData: (path: string, value: any) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

// Provider component
export function FormDataProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Update form data
  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  // Update nested form data using a path string (e.g., "passport.number")
  const updateNestedFormData = (path: string, value: any) => {
    setFormData(prev => {
      const result = { ...prev };
      const parts = path.split('.');
      let current: any = result;
      
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      
      current[parts[parts.length - 1]] = value;
      return result;
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, updateNestedFormData }}>
      {children}
    </FormContext.Provider>
  );
}

// Custom hook to use the form context
export function useFormData() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
}