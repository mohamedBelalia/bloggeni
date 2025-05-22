
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { subscriptionId, userId , planTitle , planId} = body;

  if (!subscriptionId || !userId) {
    return NextResponse.json({ error: 'Missing subscriptionId or userId' }, { status: 400 });
  }

  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PAYPAL_SECRET}`
  ).toString('base64');

  const tokenRes = await fetch(`https://api-m.paypal.com/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  const subRes = await fetch(
    `https://api-m.paypal.com/v1/billing/subscriptions/${subscriptionId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const subData = await subRes.json();

  if (!subRes.ok) {
    return NextResponse.json({ error: subData }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase.from('subscriptions').insert([
    {
      user_id: userId,
      paypal_subscription_id: subData.id,
      plan: subData.plan_id,
      status: subData.status,
      start_date: subData.start_time,
      next_billing_time: subData.billing_info?.next_billing_time ?? null,
    },
  ]);


  const { error : manageSubError } = await supabase.from('subscription_of_user')
      .update({
        plan_id: planId,
        plan_title: planTitle,
        blogs_count: planTitle === 'growth' ? 30 : planTitle === 'unlimited' ? 100000 : 0,
      }).eq('user_id', userId);

  
  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  if (manageSubError) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true, subscription: subData });
}
