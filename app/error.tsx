'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-400 mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-gold text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
