import React from 'react';

interface SchemaFormProps {
  schemaType: string;
  inputs: string[];
  formData: Record<string, string>;
  onInputChange: (name: string, value: string) => void;
}

const SchemaForm: React.FC<SchemaFormProps> = ({ schemaType, inputs, formData, onInputChange }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">{schemaType} Schema</h2>
      {inputs.map((input) => (
        <div key={input} className="mb-4">
          <label htmlFor={input} className="block text-lg">{input}</label>
          <input
            type="text"
            id={input}
            name={input}
            value={formData[input] || ''}
            onChange={(e) => onInputChange(input, e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default SchemaForm;
