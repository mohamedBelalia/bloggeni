"use client"

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: 'best 3 places in marrakech',
    keywords: 'marrakech, travel, tourism',
    language: 'english',
    size: 'large',
    tone: 'formal',
    details: 'best 3 places in marrakech'
  });

  const [jobId, setJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/jobgenerate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to create job');
      }

      const data = await res.json();
      console.log(data);
      
      setJobId(data.jobId); // Store the job ID
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };


  const pollJobStatus = async (jobId: string) => {
    const { data, error } = await supabase
      .from('blog_jobs')
      .select('status, result')
      .eq('id', jobId)
      .single();
  
    if (error) {
      console.error('Polling error:', error.message);
      return;
    }
  
    if (data.status === 'done') {
      console.log('Result is ready:', data.result);
      // Show result in UI
    } else if (data.status === 'error') {
      console.error('Job failed');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (jobId) {
        pollJobStatus(jobId);
      }
    }, 5000);
  
    return () => clearInterval(interval);
  }, [jobId]);

  

  return (
    <div>
      <h1 className='text-center my-3 text-xl'>Create a New Blog Job</h1>
      <form onSubmit={handleSubmit} className='md:w-[80%] w-full mx-auto'>
        <input
          className='border-2 border-gray-500 rounded-md p-2 mb-4 w-full block'
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          className='border-2 border-gray-500 rounded-md p-2 mb-4 w-full block'
          type="text"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
          placeholder="Keywords"
        />
        <input
          className='border-2 border-gray-500 rounded-md p-2 mb-4 w-full block'
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          placeholder="Language"
        />
        <input
          className='border-2 border-gray-500 rounded-md p-2 mb-4 w-full block'
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          placeholder="Size"
        />
        <input
          className='border-2 border-gray-500 rounded-md p-2 mb-4 w-full block'
          type="text"
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          placeholder="Tone"
        />
        <input
          className='border-2 border-gray-500 rounded-md p-2 mb-4 w-full block'
          type="text"
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Details"
        />
        <Button className='cursor-pointer' type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>

      {error && <p>Error: {error}</p>}
      {jobId && <p>Job created with ID: {jobId}</p>}
    </div>
  );
};

export default JobForm;
