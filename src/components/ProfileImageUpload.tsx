import { useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface ProfileImageUploadProps {
  userId: string;
  avatarUrl: string;
  onUpload: (url: string) => void;
}

export default function ProfileImageUpload({ userId, avatarUrl, onUpload }: ProfileImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(avatarUrl || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const fileExt = file.name.split('.').pop();
    const filePath = `avatars/${userId}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    setPreview(data.publicUrl);
    onUpload(data.publicUrl);
    setUploading(false);
  };

  return (
    <div className="mb-4 flex flex-col items-center">
      <img
        src={preview || '/default-avatar.png'}
        alt="Avatar"
        className="w-24 h-24 rounded-full object-cover mb-2 border"
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        className="bg-gray-600 text-white px-3 py-1 rounded"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Change Avatar'}
      </button>
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </div>
  );
}
