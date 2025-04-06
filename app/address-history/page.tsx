// app/address-history/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormLayout } from '../components/FormLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useFormData } from '../providers/FormDataProvider';
import { FormDataProvider } from '../providers/FormDataProvider';
import { v4 as uuidv4 } from 'uuid';

export default function AddressHistoryPage() {
  return (
    <FormDataProvider>
      <AddressHistoryContent />
    </FormDataProvider>
  );
}

function AddressHistoryContent() {
  const router = useRouter();
  const { formData, updateFormData } = useFormData();
  const [showPreviousAddresses, setShowPreviousAddresses] = useState(false);
  const [previousAddresses, setPreviousAddresses] = useState(formData.previousAddresses || []);

  // Calculate total time at current address
  const calculateTotalMonths = () => {
    return (formData.currentAddress.yearsAtAddress * 12) + formData.currentAddress.monthsAtAddress;
  };

  useEffect(() => {
    // If less than 12 months at current address, show previous addresses section
    const totalMonths = calculateTotalMonths();
    setShowPreviousAddresses(totalMonths < 12);
  }, [formData.currentAddress.yearsAtAddress, formData.currentAddress.monthsAtAddress]);

  const handleCurrentAddressChange = (field: string, value: any) => {
    updateFormData({ 
      currentAddress: { 
        ...formData.currentAddress, 
        [field]: field === 'yearsAtAddress' || field === 'monthsAtAddress' 
          ? parseInt(value) || 0 
          : value 
      } 
    });
  };

  const addPreviousAddress = () => {
    const newPreviousAddress = {
      id: uuidv4(),
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      fromDate: '',
      toDate: '',
      reasonForLeaving: ''
    };
    
    const updatedAddresses = [...previousAddresses, newPreviousAddress];
    setPreviousAddresses(updatedAddresses);
    updateFormData({ previousAddresses: updatedAddresses });
  };
  
  const removePreviousAddress = (id: string) => {
    const updatedAddresses = previousAddresses.filter(address => address.id !== id);
    setPreviousAddresses(updatedAddresses);
    updateFormData({ previousAddresses: updatedAddresses });
  };
  
  const updatePreviousAddress = (id: string, field: string, value: any) => {
    const updatedAddresses = previousAddresses.map(address => {
      if (address.id === id) {
        return { ...address, [field]: value };
      }
      return address;
    });
    
    setPreviousAddresses(updatedAddresses);
    updateFormData({ previousAddresses: updatedAddresses });
  };
  
  const handleNext = () => {
    router.push('/financial-details');
  };
  
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <FormLayout title="Address History">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Current Address</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input 
                    id="street" 
                    value={formData.currentAddress.street}
                    onChange={(e) => handleCurrentAddressChange('street', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      value={formData.currentAddress.city}
                      onChange={(e) => handleCurrentAddressChange('city', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input 
                      id="state" 
                      value={formData.currentAddress.state}
                      onChange={(e) => handleCurrentAddressChange('state', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input 
                      id="postalCode" 
                      value={formData.currentAddress.postalCode}
                      onChange={(e) => handleCurrentAddressChange('postalCode', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      value={formData.currentAddress.country}
                      onChange={(e) => handleCurrentAddressChange('country', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <h4 className="font-medium mb-2">How long have you lived at this address?</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="yearsAtAddress">Years</Label>
                      <Input 
                        id="yearsAtAddress"
                        type="number"
                        min="0"
                        value={formData.currentAddress.yearsAtAddress}
                        onChange={(e) => handleCurrentAddressChange('yearsAtAddress', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="monthsAtAddress">Months</Label>
                      <Input 
                        id="monthsAtAddress"
                        type="number"
                        min="0"
                        max="11"
                        value={formData.currentAddress.monthsAtAddress}
                        onChange={(e) => handleCurrentAddressChange('monthsAtAddress', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {showPreviousAddresses && (
            <div className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Previous Addresses</h3>
                <Button 
                  onClick={addPreviousAddress}
                  variant="outline"
                  className="border-blue-600 text-blue-600"
                >
                  Add Previous Address
                </Button>
              </div>
              
              {previousAddresses.length === 0 ? (
                <p className="text-red-500">
                  You must add your previous address history to cover at least the last 12 months.
                </p>
              ) : (
                <div className="space-y-4">
                  {previousAddresses.map((address, index) => (
                    <Card key={address.id} className="border-blue-100">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Previous Address {index + 1}</h4>
                          <Button 
                            onClick={() => removePreviousAddress(address.id)}
                            variant="ghost"
                            className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                        
                        <div className="grid gap-4">
                          <div>
                            <Label htmlFor={`prev-${address.id}-street`}>Street Address</Label>
                            <Input 
                              id={`prev-${address.id}-street`} 
                              value={address.street}
                              onChange={(e) => updatePreviousAddress(address.id, 'street', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`prev-${address.id}-city`}>City</Label>
                              <Input 
                                id={`prev-${address.id}-city`} 
                                value={address.city}
                                onChange={(e) => updatePreviousAddress(address.id, 'city', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`prev-${address.id}-state`}>State/Province</Label>
                              <Input 
                                id={`prev-${address.id}-state`} 
                                value={address.state}
                                onChange={(e) => updatePreviousAddress(address.id, 'state', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`prev-${address.id}-postalCode`}>Postal Code</Label>
                              <Input 
                                id={`prev-${address.id}-postalCode`} 
                                value={address.postalCode}
                                onChange={(e) => updatePreviousAddress(address.id, 'postalCode', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`prev-${address.id}-country`}>Country</Label>
                              <Input 
                                id={`prev-${address.id}-country`} 
                                value={address.country}
                                onChange={(e) => updatePreviousAddress(address.id, 'country', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`prev-${address.id}-fromDate`}>From Date</Label>
                              <Input 
                                id={`prev-${address.id}-fromDate`} 
                                type="date"
                                value={address.fromDate}
                                onChange={(e) => updatePreviousAddress(address.id, 'fromDate', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`prev-${address.id}-toDate`}>To Date</Label>
                              <Input 
                                id={`prev-${address.id}-toDate`} 
                                type="date"
                                value={address.toDate}
                                onChange={(e) => updatePreviousAddress(address.id, 'toDate', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor={`prev-${address.id}-reason`}>Reason for Leaving</Label>
                            <Textarea 
                              id={`prev-${address.id}-reason`} 
                              value={address.reasonForLeaving}
                              onChange={(e) => updatePreviousAddress(address.id, 'reasonForLeaving', e.target.value)}
                              className="mt-1"
                              rows={3}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="pt-6">
            <Button 
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={showPreviousAddresses && previousAddresses.length === 0}
            >
              Next
            </Button>
          </div>
        </div>
      </FormLayout>
    </main>
  );
}