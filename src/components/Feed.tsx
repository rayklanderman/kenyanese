import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Post {
  id: string;
  user_id: string;
  content: string;
  link_url: string;
  post_type: string;
  created_at: string;
  profile?: {
    username: string;
    avatar_url: string;
  };
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // Fetch posts with user profiles
      const { data, error } = await supabase
        .from('posts')
        .select('*, profile:profiles(username, avatar_url)')
        .order('created_at', { ascending: false });
      if (!error && data) setPosts(data as Post[]);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Loading feed...</div>;
  if (!posts.length) return <div>No posts yet.</div>;

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="p-4 border rounded bg-white">
          <div className="flex items-center mb-2">
            <img
              src={post.profile?.avatar_url || '/default-avatar.png'}
              alt="Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold">{post.profile?.username || 'User'}</span>
            <span className="ml-2 text-xs text-gray-500">{new Date(post.created_at).toLocaleString()}</span>
          </div>
          <div className="mb-2">
            {post.content}
            {post.link_url && (
              <div>
                <a href={post.link_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
                  {post.link_url}
                </a>
              </div>
            )}
          </div>
          <span className="inline-block px-2 py-1 text-xs bg-gray-200 rounded">{post.post_type}</span>
        </div>
      ))}
    </div>
  );
}
