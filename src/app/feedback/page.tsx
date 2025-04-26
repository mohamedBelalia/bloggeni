"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Feedback = () => {
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleFeedback = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!feedback.trim()) {
      setError("Please provide your feedback before submitting.");
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
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Share Your Thoughts</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your feedback helps us improve and create a better experience for everyone. 
            We value your input and appreciate you taking the time to share your thoughts.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
              <p className="text-gray-600 mb-8">
                Your feedback has been received. We appreciate you helping us improve our service.
              </p>
              <Button
                variant="outline"
                onClick={() => setSuccess(false)}
                className="text-primary hover:text-primary"
              >
                Submit Another Feedback
              </Button>
            </div>
          ) : (
            <form className="space-y-8">
              <div className="space-y-4">
                <Label htmlFor="name" className="text-base font-medium">
                  Name (Optional)
                </Label>
                <Input
                  id="name"
                  value={name}
                  name="name"
                  placeholder="Your name"
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="email" className="text-base font-medium">
                  Email (Optional)
                </Label>
                <Input
                  id="email"
                  value={email}
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
                <p className="text-sm text-gray-500">
                  We'll only use this to follow up on your feedback if needed.
                </p>
              </div>

              <div className="space-y-4">
                <Label htmlFor="feedback" className="text-base font-medium">
                  Your Feedback
                </Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  name="feedback"
                  placeholder="Share your thoughts, suggestions, or report any issues..."
                  onChange={(e) => setFeedback(e.target.value)}
                  className="input-field min-h-[150px]"
                />
                <p className="text-sm text-gray-500">
                  Be as detailed as possible - it helps us understand and address your feedback better.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <p>{error}</p>
                </div>
              )}

              <Button
                onClick={handleFeedback}
                disabled={loading}
                className="w-full btn-primary"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center text-gray-600">
          <p>
            Have a more urgent issue? Contact our support team at{" "}
            <a href="mailto:support@bloggenius.com" className="text-primary hover:underline">
              support@bloggenius.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
