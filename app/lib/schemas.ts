// app/lib/schemas.ts
import { z } from 'zod';

// Page 1: Passport & Personal Information
export const personalInfoSchema = z.object({
  email: z.string().email('Valid email required'),
  phone: z.string().min(5, 'Phone number is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  placeOfBirth: z.string().min(1, 'Place of birth is required'),
  hasNameChanged: z.boolean()
});

export const passportSchema = z.object({
  number: z.string().min(1, 'Passport number is required'),
  issuingAuthority: z.string().min(1, 'Issuing authority is required'),
  dateOfIssue: z.string().min(1, 'Date of issue is required'),
  dateOfExpiry: z.string().min(1, 'Date of expiry is required')
});

export const nationalIdSchema = z.object({
  number: z.string().min(1, 'ID number is required'),
  issuingAuthority: z.string().min(1, 'Issuing authority is required'),
  dateOfIssue: z.string().min(1, 'Date of issue is required'),
  dateOfExpiry: z.string().min(1, 'Date of expiry is required')
});

// Page 2: Marital Status & Family
export const spouseSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  travelingWithYou: z.boolean()
});

export const childSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  travelingWithYou: z.boolean()
});

// Page 3: Address History
export const currentAddressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State/province is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  yearsAtAddress: z.number().min(0),
  monthsAtAddress: z.number().min(0).max(11)
});

export const previousAddressSchema = z.object({
  id: z.string(),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State/province is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  fromDate: z.string().min(1, 'From date is required'),
  toDate: z.string().min(1, 'To date is required'),
  reasonForLeaving: z.string().min(1, 'Reason for leaving is required')
});

// Page 4: Financial Details
export const employmentSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  startDate: z.string().min(1, 'Start date is required'),
  salary: z.string().min(1, 'Salary is required'),
  employerAddress: z.string().min(1, 'Employer address is required'),
  employerPhone: z.string().min(1, 'Employer phone is required')
});

export const selfEmploymentSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  annualIncome: z.string().min(1, 'Annual income is required'),
  startDate: z.string().min(1, 'Start date is required')
});

export const educationSchema = z.object({
  institutionName: z.string().min(1, 'Institution name is required'),
  course: z.string().min(1, 'Course name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  isFullTime: z.boolean()
});

export const sponsorDetailsSchema = z.object({
  name: z.string().min(1, 'Sponsor name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  contactInfo: z.string().min(1, 'Contact information is required')
});