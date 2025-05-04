import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ProfileImageUpload from './ProfileImageUpload';
import PostForm from './PostForm';
import Feed from './Feed';

interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  github_username: string;
  wakatime_username: string;
  discord_id: string;
  website: string;
  preferences: any;
  open_to_gigs: boolean;
  open_to_jobs: boolean;
  open_to_volunteering: boolean;
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (error && error.code === 'PGRST116') {
        // Create profile if not exists
        const username = user.email ? user.email.split('@')[0] : '';
        const { error: insertError } = await supabase.from('profiles').insert({ id: user.id, username, full_name: '', avatar_url: '', bio: '' });
        if (!insertError) setProfile({ id: user.id, username, full_name: '', avatar_url: '', bio: '', github_username: '', wakatime_username: '', discord_id: '', website: '', preferences: {}, open_to_gigs: false, open_to_jobs: false, open_to_volunteering: false });
      } else if (data) {
        setProfile(data as Profile);
      }
      setLoading(false);
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!profile) return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!profile) return;
    setLoading(true);
    const { error } = await supabase.from('profiles').update(profile).eq('id', profile.id);
    setLoading(false);
    if (error) setError(error.message);
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile found.</div>;

  return (
    <div className="max-w-xl mx-auto mt-12">
      <div className="p-6 border rounded shadow bg-white mb-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <ProfileImageUpload
          userId={profile.id}
          avatarUrl={profile.avatar_url}
          onUpload={async (url: string) => {
            setProfile({ ...profile, avatar_url: url });
            await supabase.from('profiles').update({ avatar_url: url }).eq('id', profile.id);
          }}
        />
        <input className="border p-2 w-full mb-2" name="username" placeholder="Username" value={profile.username} onChange={handleChange} />
        <input className="border p-2 w-full mb-2" name="full_name" placeholder="Full Name" value={profile.full_name} onChange={handleChange} />
        <textarea className="border p-2 w-full mb-2" name="bio" placeholder="Bio" value={profile.bio} onChange={handleChange} />
        <input className="border p-2 w-full mb-2" name="github_username" placeholder="GitHub Username" value={profile.github_username} onChange={handleChange} />
        <input className="border p-2 w-full mb-2" name="wakatime_username" placeholder="Wakatime Username" value={profile.wakatime_username} onChange={handleChange} />
        <input className="border p-2 w-full mb-2" name="discord_id" placeholder="Discord ID" value={profile.discord_id} onChange={handleChange} />
        <input className="border p-2 w-full mb-2" name="website" placeholder="Website" value={profile.website} onChange={handleChange} />
        {/* Preferences and toggles can be added here */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave} disabled={loading}>Save</button>
        {error && <div className="text-red-600">{error}</div>}
      </div>
      <PostForm userId={profile.id} onPostCreated={() => {}} />
      <Feed />
    </div>
  );
}


