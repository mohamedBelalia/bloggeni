
import React from "react";
import { createClient } from '@/utils/supabase/server';
import CheckoutGrowthP from "./CheckoutGrowthP";

export default async function CheckoutGrowtPage() {

     const supabase = createClient();
     const { data, error } = await supabase.auth.getUser();

    return (
        <div>
            <CheckoutGrowthP userId={data.user?.id} />
        </div>
    );
}


