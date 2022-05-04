import axios from 'axios';
import supabase from './supabase';

const base = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

base.interceptors.request.use((config) => {
  if (config.headers) {
    const session = supabase.auth.session();

    if (session?.access_token)
      config.headers['authorization'] = `Bearer ${session?.access_token ?? ''}`;
  }
  return config;
});

export default base;
