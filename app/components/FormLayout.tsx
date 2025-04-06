// app/components/FormLayout.tsx
'use client';

import React, { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface FormLayoutProps {
  children: ReactNode;
  title: string;
  className?: string;
}

export function FormLayout({ children, title, className }: FormLayoutProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-center mb-6">
        <div className="flex items-center text-blue-700 font-semibold">
          <div className="bg-blue-700 h-8 w-8 flex items-center justify-center rounded-md text-white mr-2">
            UK
          </div>
          UK VISA APP
        </div>
      </div>
      
      <h1 className="text-2xl font-semibold text-blue-700 text-center mb-6">
        {title}
      </h1>
      
      <div className={cn("border-t pt-6", className)}>
        {children}
      </div>
    </div>
  );
}