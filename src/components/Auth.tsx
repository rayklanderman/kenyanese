import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (type: 'signIn' | 'signUp') => {
    setLoading(true);
    setError(null);
    const fn = type === 'signIn' ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await fn({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  };

  const handleProvider = async (provider: 'github' | 'discord') => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    setLoading(false);
    if (error) setError(error.message);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Sign in / Sign up</h2>
      <input
        className="border p-2 w-full mb-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className="flex gap-2 mb-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleLogin('signIn')} disabled={loading}>Sign In</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => handleLogin('signUp')} disabled={loading}>Sign Up</button>
      </div>
      <div className="flex gap-2 mb-2">
        <button className="bg-black text-white px-4 py-2 rounded" onClick={() => handleProvider('github')} disabled={loading}>GitHub</button>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={() => handleProvider('discord')} disabled={loading}>Discord</button>
      </div>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}
