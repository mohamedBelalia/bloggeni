"use client"

import React from 'react';

interface JsonLdDisplayProps {
  jsonLd: string;
}

const JsonLdDisplay: React.FC<JsonLdDisplayProps> = ({ jsonLd }) => {
  return (
    <div className="mt-8 p-4 border border-gray-300 rounded">
      <h2 className="text-xl font-semibold mb-4">Generated JSON-LD</h2>
      <pre className="whitespace-pre-wrap break-all">{jsonLd}</pre>
    </div>
  );
};

export default JsonLdDisplay;
