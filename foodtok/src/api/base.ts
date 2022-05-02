import axios from 'axios';
import supabase from './supabase';

const base = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// const refreshToken = () => {
//   if (session) {
//     const expiration = session.expires_at;
//     if (expiration) {
//       const expirationTime = new Date(expiration * 1000);
//       // set one hour back
//       expirationTime.setHours(expirationTime.getHours() - 1);
//       const now = new Date(Date.now());
//       if (expirationTime.getTime() >= now.getTime()) {
//         supabase.auth.refreshSession();
//       }
//     }
//   }
//   return session;
// };

base.interceptors.request.use((config) => {
  if (config.headers) {
    const session = supabase.auth.session();

    config.headers['authorization'] = `Bearer ${session?.access_token ?? ''}`;
  }
  return config;
});

export default base;
