// app/components/PersonalInfo.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useFormData } from '../providers/FormDataProvider';
import { personalInfoSchema } from '../lib/schemas';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useEffect } from 'react';

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

export function PersonalInfo() {
  const router = useRouter();
  const { formData, updateFormData } = useFormData();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData.personalInfo
  });
  
  useEffect(() => {
    // Pre-fill form with existing data
    if (formData.personalInfo) {
      setValue('email', formData.personalInfo.email);
      setValue('phone', formData.personalInfo.phone);
      setValue('firstName', formData.personalInfo.firstName);
      setValue('lastName', formData.personalInfo.lastName);
      setValue('gender', formData.personalInfo.gender);
      setValue('placeOfBirth', formData.personalInfo.placeOfBirth);
      setValue('hasNameChanged', formData.personalInfo.hasNameChanged);
    }
  }, [formData.personalInfo, setValue]);
  
  const onSubmit = (data: PersonalInfoFormValues) => {
    updateFormData({ personalInfo: data });
    router.push('/personal-details');
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl text-blue-700 mb-4">Personal Information</h2>
      
      <div className="grid gap-4">
        <div>
          <Label htmlFor="email">Your Email Address?</Label>
          <Input 
            id="email" 
            {...register('email')} 
            className="mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="phone">Your Phone Number?</Label>
          <Input 
            id="phone" 
            {...register('phone')} 
            className="mt-1"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="firstName">Your First Name (Latin characters)?</Label>
          <Input 
            id="firstName" 
            {...register('firstName')} 
            className="mt-1"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="lastName">Your Last Name (Latin characters)?</Label>
          <Input 
            id="lastName" 
            {...register('lastName')} 
            className="mt-1"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>
        
        <div>
          <Label>Your Gender?</Label>
          <RadioGroup 
            defaultValue={formData.personalInfo.gender}
            className="mt-2"
            onValueChange={(value) => setValue('gender', value as 'Male' | 'Female' | 'Other')}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="placeOfBirth">Your Place of Birth (City, Country)?</Label>
          <Input 
            id="placeOfBirth" 
            {...register('placeOfBirth')} 
            className="mt-1"
          />
          {errors.placeOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.placeOfBirth.message}</p>
          )}
        </div>
        
        <div>
          <Label>Have your names/surnames changed?</Label>
          <RadioGroup 
            defaultValue={formData.personalInfo.hasNameChanged ? "yes" : "no"}
            className="mt-2"
            onValueChange={(value) => setValue('hasNameChanged', value === "yes")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="name-changed-yes" />
              <Label htmlFor="name-changed-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="name-changed-no" />
              <Label htmlFor="name-changed-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <h2 className="text-xl text-blue-700 mb-4 pt-4">Passport Information</h2>
      
      <div className="grid gap-4">
        <div>
          <Label htmlFor="passportNumber">Passport Number?</Label>
          <Input 
            id="passportNumber" 
            value={formData.passport.number}
            onChange={(e) => updateFormData({ 
              passport: { ...formData.passport, number: e.target.value } 
            })}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="issuingAuthority">Issuing Authority?</Label>
          <Input 
            id="issuingAuthority" 
            value={formData.passport.issuingAuthority}
            onChange={(e) => updateFormData({ 
              passport: { ...formData.passport, issuingAuthority: e.target.value } 
            })}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="dateOfIssue">Date of Issue?</Label>
          <Input 
            id="dateOfIssue" 
            type="date"
            value={formData.passport.dateOfIssue}
            onChange={(e) => updateFormData({ 
              passport: { ...formData.passport, dateOfIssue: e.target.value } 
            })}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="dateOfExpiry">Date of Expiry?</Label>
          <Input 
            id="dateOfExpiry" 
            type="date"
            value={formData.passport.dateOfExpiry}
            onChange={(e) => updateFormData({ 
              passport: { ...formData.passport, dateOfExpiry: e.target.value } 
            })}
            className="mt-1"
          />
        </div>
      </div>
      
      <h2 className="text-xl text-blue-700 mb-4 pt-4">National Identity Document (ID Card) - If applicable</h2>
      
      <div className="grid gap-4">
        <div>
          <Label htmlFor="nationalIdNumber">National ID Number?</Label>
          <Input 
            id="nationalIdNumber" 
            value={formData.nationalId.number}
            onChange={(e) => updateFormData({ 
              nationalId: { ...formData.nationalId, number: e.target.value } 
            })}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="nationalIdAuthority">Issuing Authority?</Label>
          <Input 
            id="nationalIdAuthority" 
            value={formData.nationalId.issuingAuthority}
            onChange={(e) => updateFormData({ 
              nationalId: { ...formData.nationalId, issuingAuthority: e.target.value } 
            })}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="nationalIdIssue">Date of Issue?</Label>
          <Input 
            id="nationalIdIssue" 
            type="date"
            value={formData.nationalId.dateOfIssue}
            onChange={(e) => updateFormData({ 
              nationalId: { ...formData.nationalId, dateOfIssue: e.target.value } 
            })}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="nationalIdExpiry">Date of Expiry?</Label>
          <Input 
            id="nationalIdExpiry" 
            type="date"
            value={formData.nationalId.dateOfExpiry}
            onChange={(e) => updateFormData({ 
              nationalId: { ...formData.nationalId, dateOfExpiry: e.target.value } 
            })}
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="pt-6">
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Next
        </Button>
      </div>
      
      <div className="bg-green-100 text-green-800 p-3 rounded-md mt-4">
        Application data received successfully by server!
      </div>
    </form>
  );
}