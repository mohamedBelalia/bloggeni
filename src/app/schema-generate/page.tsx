"use client"


import React, { useState } from 'react';
import SchemaForm from './SchemaForm';
import JsonLdDisplay from './JsonLdDisplay';

type SchemaType = 'Article' | 'Person' | 'FAQ';

const schemaInputs: Record<SchemaType, string[]> = {
  Article: ['headline', 'description', 'author', 'datePublished'],
  Person: ['name', 'jobTitle', 'birthDate', 'email'],
  FAQ: ['question', 'answer'],
};

const SchemaGenerator = () => {
  const [selectedSchema, setSelectedSchema] = useState<SchemaType | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [jsonLd, setJsonLd] = useState<string>('');

  const handleSchemaSelect = (schema: SchemaType) => {
    setSelectedSchema(schema);
    setFormData({});
    setJsonLd('');
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateJsonLd = () => {
    if (selectedSchema) {
      const jsonData = { '@context': 'https://schema.org', '@type': selectedSchema, ...formData };
      setJsonLd(JSON.stringify(jsonData, null, 2));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Schema Generator</h1>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Schema Type</label>
        <div className="space-x-4">
          <button
            className="btn"
            onClick={() => handleSchemaSelect('Article')}
          >
            Article
          </button>
          <button
            className="btn"
            onClick={() => handleSchemaSelect('Person')}
          >
            Person
          </button>
          <button
            className="btn"
            onClick={() => handleSchemaSelect('FAQ')}
          >
            FAQ
          </button>
        </div>
      </div>

      {selectedSchema && (
        <>
          <SchemaForm
            schemaType={selectedSchema}
            inputs={schemaInputs[selectedSchema]}
            formData={formData}
            onInputChange={handleInputChange}
          />
          <button
            className="mt-6 btn bg-blue-500"
            onClick={generateJsonLd}
          >
            Generate JSON-LD
          </button>
        </>
      )}

      {jsonLd && <JsonLdDisplay jsonLd={jsonLd} />}
    </div>
  );
};

export default SchemaGenerator;
