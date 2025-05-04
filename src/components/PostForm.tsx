import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface PostFormProps {
  userId: string;
  onPostCreated: () => void;
}

export default function PostForm({ userId, onPostCreated }: PostFormProps) {
  const [content, setContent] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [postType, setPostType] = useState<'post' | 'project' | 'link'>('post');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.from('posts').insert({
      user_id: userId,
      content,
      link_url: linkUrl,
      post_type: postType,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setContent('');
      setLinkUrl('');
      setPostType('post');
      onPostCreated();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-white">
      <h3 className="text-lg font-bold mb-2">Share something</h3>
      <select
        className="border p-2 mb-2 w-full"
        value={postType}
        onChange={e => setPostType(e.target.value as 'post' | 'project' | 'link')}
      >
        <option value="post">Post</option>
        <option value="project">Project</option>
        <option value="link">Link</option>
      </select>
      <textarea
        className="border p-2 mb-2 w-full"
        placeholder="What's on your mind?"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      {(postType === 'project' || postType === 'link') && (
        <input
          className="border p-2 mb-2 w-full"
          type="url"
          placeholder={postType === 'project' ? 'Project URL' : 'Link URL'}
          value={linkUrl}
          onChange={e => setLinkUrl(e.target.value)}
          required
        />
      )}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit" disabled={loading}>
        {loading ? 'Posting...' : 'Post'}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </form>
  );
}
