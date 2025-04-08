"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase'; 

const Feedback = () => {
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleFeedback = async () => {
    setLoading(true);
    setError(null);

    if (!feedback.trim()) {
      setError("Feedback Text is required.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("feedback").insert([
      {
        feedback,
        ...(name && { name }),
        ...(email && { email }),
      },
    ]);

    setLoading(false);

    if (error) {
      setError("Something went wrong. Please try again later.");
      console.error(error);
    } else {
      setFeedback("");
      setName("");
      setEmail("");
      alert("Thank you for your feedback!");
    }
  };

  return (
    <div className="mt-5 md:w-[80%] w-[90%] mx-auto min-h-screen">
      <h1 className="text-center font-semibold text-4xl mt-14">
        We&apos;d Love to Hear From You!
      </h1>
      <p className="text-center font-medium text-gray-600 mt-5 md:w-[60%] w-full mx-auto">
        Your experience matters to us. Whether you have a suggestion, a bug report,
        or just a comment about our AI blog generator, your feedback
        helps us improve and serve you better.
      </p>

      <div className="md:w-[40%] w-full mx-auto mt-10 flex flex-col gap-8">
        <div>
          <Label htmlFor="name" className="text-right mb-3">
            Name
          </Label>
          <Input
            id="name"
            value={name}
            name="name"
            placeholder="Tell us your name (optional)."
            onChange={(e) => setName(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-right mb-3">
            Email
          </Label>
          <Input
            id="email"
            value={email}
            name="email"
            placeholder="Provide your email if you’d like us to follow up on your feedback."
            onChange={(e) => setEmail(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div>
          <Label htmlFor="feedback" className="text-right mb-3">
            Feedback
          </Label>
          <Textarea
            id="feedback"
            value={feedback}
            name="feedback"
            placeholder="Type your feedback here. Be as detailed as you can it really helps!"
            onChange={(e) => setFeedback(e.target.value)}
            className="col-span-3"
          />
        </div>
        <Button className='bg-[#076d81] cursor-pointer hover:bg-[#076d81]' onClick={handleFeedback} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Feedback;
