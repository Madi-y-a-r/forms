// app/components/NationalIDAnalysis.tsx
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useFormData } from '../providers/FormDataProvider';

export function NationalIDAnalysis() {
  const { updateNestedFormData } = useFormData();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setError('');
    }
  };
  
  const handleAnalyze = () => {
    // In a real application, this would upload and analyze the file
    if (!selectedFile) {
      setError('Please select a National ID PDF file first.');
      return;
    }
    
    // For demo purposes, we'll just set an error
    setError('Please select a National ID PDF file first.');
  };
  
  return (
    <div className="border border-dashed rounded-lg p-6 mb-6">
      <h2 className="text-xl text-blue-700 mb-4">National ID Analysis (Optional)</h2>
      
      <div className="mb-4">
        <Label htmlFor="national-id-pdf">Upload National ID PDF:</Label>
        <Input 
          id="national-id-pdf" 
          type="file" 
          accept=".pdf" 
          onChange={handleFileChange}
          className="mt-1"
        />
      </div>
      
      <Button 
        onClick={handleAnalyze}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Analyze & Fill Fields
      </Button>
      
      {error && (
        <p className="text-red-600 mt-4">
          {error}
        </p>
      )}
      
      <p className="text-gray-600 mt-2 text-sm">
        Upload national ID to auto-fill fields below.
      </p>
    </div>
  );
}