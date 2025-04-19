
import React from 'react'
import SubscriptionsPage from './InvoicesList'
import { createClient } from '@/utils/supabase/server';

const Subscriptions = async () => {

  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <div>
        <SubscriptionsPage userId={data.user?.id} />
    </div>
  )
}

export default Subscriptions