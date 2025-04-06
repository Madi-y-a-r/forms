// app/financial-details/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormLayout } from '../components/FormLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { Textarea } from '../components/ui/textarea';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useFormData } from '../providers/FormDataProvider';
import { FormDataProvider } from '../providers/FormDataProvider';
import { CheckCircle2 } from 'lucide-react';

export default function FinancialDetailsPage() {
  return (
    <FormDataProvider>
      <FinancialDetailsContent />
    </FormDataProvider>
  );
}

function FinancialDetailsContent() {
  const router = useRouter();
  const { formData, updateFormData } = useFormData();
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Employment form state
  const [employmentDetails, setEmploymentDetails] = useState({
    employmentForm: null as React.ReactNode | null,
    sponsorForm: null as React.ReactNode | null
  });
  
  // Update employment form based on status
  useEffect(() => {
    let form = null;
    
    switch (formData.employmentStatus) {
      case 'Employed':
        form = (
          <div className="grid gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input 
                id="companyName" 
                value={formData.employment?.companyName || ''}
                onChange={(e) => updateEmploymentDetail('companyName', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input 
                id="jobTitle" 
                value={formData.employment?.jobTitle || ''}
                onChange={(e) => updateEmploymentDetail('jobTitle', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input 
                id="startDate"
                type="date" 
                value={formData.employment?.startDate || ''}
                onChange={(e) => updateEmploymentDetail('startDate', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="salary">Annual Salary</Label>
              <Input 
                id="salary" 
                value={formData.employment?.salary || ''}
                onChange={(e) => updateEmploymentDetail('salary', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="employerAddress">Employer Address</Label>
              <Input 
                id="employerAddress" 
                value={formData.employment?.employerAddress || ''}
                onChange={(e) => updateEmploymentDetail('employerAddress', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="employerPhone">Employer Phone</Label>
              <Input 
                id="employerPhone" 
                value={formData.employment?.employerPhone || ''}
                onChange={(e) => updateEmploymentDetail('employerPhone', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );
        break;
        
      case 'Self-employed':
        form = (
          <div className="grid gap-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input 
                id="businessName" 
                value={formData.selfEmployment?.businessName || ''}
                onChange={(e) => updateSelfEmploymentDetail('businessName', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Input 
                id="businessType" 
                value={formData.selfEmployment?.businessType || ''}
                onChange={(e) => updateSelfEmploymentDetail('businessType', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="annualIncome">Annual Income</Label>
              <Input 
                id="annualIncome" 
                value={formData.selfEmployment?.annualIncome || ''}
                onChange={(e) => updateSelfEmploymentDetail('annualIncome', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="selfStartDate">Business Start Date</Label>
              <Input 
                id="selfStartDate"
                type="date" 
                value={formData.selfEmployment?.startDate || ''}
                onChange={(e) => updateSelfEmploymentDetail('startDate', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );
        break;
        
      case 'Student':
        form = (
          <div className="grid gap-4">
            <div>
              <Label htmlFor="institutionName">Institution Name</Label>
              <Input 
                id="institutionName" 
                value={formData.education?.institutionName || ''}
                onChange={(e) => updateEducationDetail('institutionName', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="course">Course/Degree</Label>
              <Input 
                id="course" 
                value={formData.education?.course || ''}
                onChange={(e) => updateEducationDetail('course', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="eduStartDate">Start Date</Label>
              <Input 
                id="eduStartDate"
                type="date" 
                value={formData.education?.startDate || ''}
                onChange={(e) => updateEducationDetail('startDate', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="eduEndDate">Expected End Date</Label>
              <Input 
                id="eduEndDate"
                type="date" 
                value={formData.education?.endDate || ''}
                onChange={(e) => updateEducationDetail('endDate', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="fullTime" 
                checked={formData.education?.isFullTime || false}
                onCheckedChange={(checked) => 
                  updateEducationDetail('isFullTime', !!checked)
                }
              />
              <Label htmlFor="fullTime">This is a full-time course</Label>
            </div>
          </div>
        );
        break;
        
      default:
        form = null;
    }
    
    setEmploymentDetails(prev => ({ ...prev, employmentForm: form }));
  }, [formData.employmentStatus, formData.employment, formData.selfEmployment, formData.education]);
  
  // Update sponsor form based on selection
  useEffect(() => {
    let sponsorForm = null;
    
    if (formData.tripSponsor && formData.tripSponsor !== 'Self') {
      sponsorForm = (
        <div className="grid gap-4 mt-4">
          <div>
            <Label htmlFor="sponsorName">Sponsor's Name</Label>
            <Input 
              id="sponsorName" 
              value={formData.sponsorDetails?.name || ''}
              onChange={(e) => updateSponsorDetail('name', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div></div>