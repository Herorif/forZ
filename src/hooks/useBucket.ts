import { useState, useEffect } from 'react';

function generateBucketId(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function useBucket(): [string | null, (id: string) => void] {
  const [bucketId, setBucketId] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const bucketIdFromUrl = searchParams.get('b');

    if (bucketIdFromUrl) {
      setBucketId(bucketIdFromUrl);
      localStorage.setItem('bucketId', bucketIdFromUrl);
    } else {
      const storedBucketId = localStorage.getItem('bucketId');
      if (storedBucketId) {
        setBucketId(storedBucketId);
      } else {
        const newBucketId = generateBucketId(16);
        setBucketId(newBucketId);
        localStorage.setItem('bucketId', newBucketId);
      }
    }
  }, []);

  const setAndStoreBucketId = (id: string) => {
    setBucketId(id);
    localStorage.setItem('bucketId', id);
  };

  return [bucketId, setAndStoreBucketId];
}
