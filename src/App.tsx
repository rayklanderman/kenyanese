import { useEffect, useState } from 'react';
import Auth from './components/Auth';
import Profile from './components/Profile';
import { supabase } from './lib/supabaseClient';
import './App.css';

function App() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      {session ? <Profile /> : <Auth />}
    </div>
  );
}

export default App
