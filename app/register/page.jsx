import { createClient } from "@supabase/supabase-js";

export const Register = () => {
    const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY);
    // TODO: Implement registration logic

    return (
        <div>Register</div>
    )
}
