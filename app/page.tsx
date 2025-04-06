// app/page.tsx
'use client';

import { FormLayout } from './components/FormLayout';
import { PassportAnalysis } from './components/PassportAnalysis';
import { NationalIDAnalysis } from './components/NationalIDAnalysis';
import { PersonalInfo } from './components/PersonalInfo';
import { FormDataProvider } from './providers/FormDataProvider';

export default function Home() {
  return (
    <FormDataProvider>
      <main className="min-h-screen bg-gray-50 py-8">
        <FormLayout title="UK Visa Application">
          <PassportAnalysis />
          <NationalIDAnalysis />
          <PersonalInfo />
        </FormLayout>
      </main>
    </FormDataProvider>
  );
}