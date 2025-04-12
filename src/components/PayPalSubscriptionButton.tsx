// components/PayPalSubscriptionButton.tsx
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalSubscriptionButtonProps {
  planId: string;
  onSuccess: (subscriptionId: string) => void;
}

export default function PayPalSubscriptionButton({
  planId,
  onSuccess,
}: PayPalSubscriptionButtonProps) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        intent: "subscription",
        vault: true,
        environment: "production",
    }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            plan_id: planId,
          });
        }}
        onApprove={(data) => {
          console.log("Subscription approved: ", data);
          if (data.subscriptionID) {
            return Promise.resolve(onSuccess(data.subscriptionID));
          } else {
            console.error("Subscription ID is null or undefined.");
            return Promise.reject(new Error("Subscription ID is null or undefined."));
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
        }}
      />
    </PayPalScriptProvider>
  );
}
