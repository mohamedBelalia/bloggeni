
import React from "react";
import CheckoutUnlim from "./CheckoutUnlim";
import { createClient } from '@/utils/supabase/server';

export default async function CheckoutUmimitedPage() {

    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    
    if(error) {
        console.log(error);
     }

    return (
        <div>
            <CheckoutUnlim userId={data.user?.id} />
        </div>
    );
}
