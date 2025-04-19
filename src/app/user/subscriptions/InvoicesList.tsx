'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SubscriptionInvoice {
  id: string;
  paypal_subscription_id: string;
  plan: string;
  currency: string;
  start_date: string;
  next_billing_time: string;
  status: 'ACTIVE' | 'canceled' | 'pending';
  created_at: string;
}

const statusColor = {
  ACTIVE: 'bg-green-100 text-green-700',
  canceled: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-800',
};

export default function SubscriptionsPage({userId} : {userId : string | undefined}) {
  const [invoices, setInvoices] = useState<SubscriptionInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);

      const {
        data,
        error
      } = await supabase
        .from('subscriptions')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', userId); 

      if (error) {
        console.error('Failed to fetch invoices:', error.message);
      } else {
        setInvoices(data);
      }

      setLoading(false);
    };

    fetchInvoices();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-gray-900">Subscription History</h1>

    {loading ? (
      <p className="text-center text-gray-500 text-lg">Loading subscriptions...</p>
    ) : invoices.length === 0 ? (
      <p className="text-center text-gray-500 text-lg">No subscriptions found.</p>
    ) : (
      <div className="space-y-6">
        {invoices.map((sub) => (
          <Card
            key={sub.id}
            className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 bg-white"
          >
            <CardContent className="p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-800">{sub.plan}</h2>
                <Badge className={`${statusColor[sub.status]} px-3 py-1 text-sm capitalize rounded-full`}>{sub.status}</Badge>
              </div>

              <p className="text-sm text-gray-600 break-all">PayPal Subscription ID: <strong>{sub.paypal_subscription_id}</strong></p>

              <div className="flex justify-between items-center gap-4 text-sm text-gray-700">
                <p><span className="font-medium text-gray-800">Start Date :</span> {new Date(sub.start_date).toLocaleDateString()}</p>
                <p><span className="font-medium text-gray-800">Next Billing Date :</span> {new Date(sub.next_billing_time).toLocaleDateString()}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(sub.created_at).toLocaleDateString()}</span>
                </div>
                {/* <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download size={16} />
                  Download Invoice
                </Button> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )}
  </div>
  );
}
