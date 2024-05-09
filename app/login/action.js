'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function login(email, password) {
    const supabase = createClient();

    const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signUp(email, password) {
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}
