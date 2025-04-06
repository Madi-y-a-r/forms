// app/personal-details/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormLayout } from '../components/FormLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { Card, CardContent } from '../components/ui/card';
import { useFormData } from '../providers/FormDataProvider';
import { FormDataProvider } from '../providers/FormDataProvider';
import { v4 as uuidv4 } from 'uuid';

export default function PersonalDetailsPage() {
  return (
    <FormDataProvider>
      <PersonalDetailsContent />
    </FormDataProvider>
  );
}

function PersonalDetailsContent() {
  const router = useRouter();
  const { formData, updateFormData } = useFormData();
  const [showSpouseForm, setShowSpouseForm] = useState(formData.maritalStatus === 'Married');
  
  // For children management
  const [children, setChildren] = useState(formData.children || []);
  
  const handleMaritalStatusChange = (value: string) => {
    updateFormData({ maritalStatus: value as any });
    setShowSpouseForm(value === 'Married');
  };
  
  const handleSpouseChange = (field: string, value: any) => {
    if (!formData.spouse) {
      updateFormData({ 
        spouse: { 
          firstName: '', 
          lastName: '', 
          dateOfBirth: '', 
          nationality: '', 
          travelingWithYou: false,
          [field]: value 
        } 
      });
    } else {
      updateFormData({ 
        spouse: { 
          ...formData.spouse, 
          [field]: value 
        } 
      });
    }
  };
  
  const addChild = () => {
    const newChild = {
      id: uuidv4(),
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      relationship: '',
      travelingWithYou: false
    };
    
    const updatedChildren = [...children, newChild];
    setChildren(updatedChildren);
    updateFormData({ children: updatedChildren });
  };
  
  const removeChild = (id: string) => {
    const updatedChildren = children.filter(child => child.id !== id);
    setChildren(updatedChildren);
    updateFormData({ children: updatedChildren });
  };
  
  const updateChild = (id: string, field: string, value: any) => {
    const updatedChildren = children.map(child => {
      if (child.id === id) {
        return { ...child, [field]: value };
      }
      return child;
    });
    
    setChildren(updatedChildren);
    updateFormData({ children: updatedChildren });
  };
  
  const handleNext = () => {
    router.push('/address-history');
  };
  
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <FormLayout title="Family Information">
        <div className="space-y-6">
          <div>
            <Label className="text-lg font-medium">Marital Status</Label>
            <RadioGroup 
              value={formData.maritalStatus}
              onValueChange={handleMaritalStatusChange}
              className="mt-3 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Single" id="marital-single" />
                <Label htmlFor="marital-single">Single</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Married" id="marital-married" />
                <Label htmlFor="marital-married">Married</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Divorced" id="marital-divorced" />
                <Label htmlFor="marital-divorced">Divorced</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Widowed" id="marital-widowed" />
                <Label htmlFor="marital-widowed">Widowed</Label>
              </div>
            </RadioGroup>
          </div>
          
          {showSpouseForm && (
            <Card className="border-blue-200">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Spouse Information</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="spouse-firstName">First Name</Label>
                    <Input 
                      id="spouse-firstName" 
                      value={formData.spouse?.firstName || ''}
                      onChange={(e) => handleSpouseChange('firstName', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="spouse-lastName">Last Name</Label>
                    <Input 
                      id="spouse-lastName" 
                      value={formData.spouse?.lastName || ''}
                      onChange={(e) => handleSpouseChange('lastName', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="spouse-dateOfBirth">Date of Birth</Label>
                    <Input 
                      id="spouse-dateOfBirth" 
                      type="date"
                      value={formData.spouse?.dateOfBirth || ''}
                      onChange={(e) => handleSpouseChange('dateOfBirth', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="spouse-nationality">Nationality</Label>
                    <Input 
                      id="spouse-nationality" 
                      value={formData.spouse?.nationality || ''}
                      onChange={(e) => handleSpouseChange('nationality', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="spouse-traveling" 
                      checked={formData.spouse?.travelingWithYou || false}
                      onCheckedChange={(checked) => 
                        handleSpouseChange('travelingWithYou', checked)
                      }
                    />
                    <Label htmlFor="spouse-traveling">Traveling with you to UK?</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Children Information</h3>
              <Button 
                onClick={addChild}
                variant="outline"
                className="border-blue-600 text-blue-600"
              >
                Add Child
              </Button>
            </div>
            
            {children.length === 0 ? (
              <p className="text-gray-500 italic">No children added.</p>
            ) : (
              <div className="space-y-4">
                {children.map((child, index) => (
                  <Card key={child.id} className="border-blue-100">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Child {index + 1}</h4>
                        <Button 
                          onClick={() => removeChild(child.id)}
                          variant="ghost"
                          className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                      
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor={`child-${child.id}-firstName`}>First Name</Label>
                          <Input 
                            id={`child-${child.id}-firstName`} 
                            value={child.firstName}
                            onChange={(e) => updateChild(child.id, 'firstName', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`child-${child.id}-lastName`}>Last Name</Label>
                          <Input 
                            id={`child-${child.id}-lastName`} 
                            value={child.lastName}
                            onChange={(e) => updateChild(child.id, 'lastName', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`child-${child.id}-dateOfBirth`}>Date of Birth</Label>
                          <Input 
                            id={`child-${child.id}-dateOfBirth`} 
                            type="date"
                            value={child.dateOfBirth}
                            onChange={(e) => updateChild(child.id, 'dateOfBirth', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`child-${child.id}-relationship`}>Relationship</Label>
                          <Input 
                            id={`child-${child.id}-relationship`} 
                            value={child.relationship}
                            placeholder="e.g., Son, Daughter, Step-Child"
                            onChange={(e) => updateChild(child.id, 'relationship', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`child-${child.id}-traveling`} 
                            checked={child.travelingWithYou}
                            onCheckedChange={(checked) => 
                              updateChild(child.id, 'travelingWithYou', !!checked)
                            }
                          />
                          <Label htmlFor={`child-${child.id}-traveling`}>
                            Traveling with you to UK?
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          <div className="pt-6">
            <Button 
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Next
            </Button>
          </div>
        </div>
      </FormLayout>
    </main>
  );
}